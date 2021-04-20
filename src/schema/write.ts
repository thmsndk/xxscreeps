import { BufferView } from './buffer-view';
import { Cache, getOrSet } from './cache';
import { Format, ShapeOf, Variant } from './format';
import { Layout, StructLayout, kPointerSize, alignTo, getLayout, unpackWrappedStruct } from './layout';
import { runOnce } from 'xxscreeps/utility/memoize';
import { entriesWithSymbols } from './symbol';

export type Writer<Type = any> = (value: Type, view: BufferView, offset: number, heap: number) => number;
export type MemberWriter = (value: any, view: BufferView, offset: number, heap: number) => number;

function makeMemberWriter(layout: StructLayout, cache: Cache): MemberWriter {
	return getOrSet(cache.memberWriter, layout, () => {

		let writeMembers: MemberWriter | undefined;
		for (const [ key, member ] of entriesWithSymbols(layout.struct)) {

			// Make writer for single field
			const next = function(): MemberWriter {
				const { member: layout, offset } = member;
				const write = makeTypeWriter(layout, cache);

				// Wrap to write this field at reserved address
				return (value, view, instanceOffset, heap) =>
					write(value[key], view, instanceOffset + offset, heap);
			}();
			next.displayName = `_${typeof key === 'symbol' ? key.description : key}`;

			// Combine member writers
			const prev = writeMembers;
			if (prev === undefined) {
				writeMembers = next;
			} else {
				writeMembers = (value, view, offset, heap) =>
					prev(value, view, offset, next(value, view, offset, heap));
			}
		}

		// Run inheritance recursively
		const { inherit } = layout;
		if (inherit === undefined) {
			return writeMembers!;
		} else {
			const writeBase = makeMemberWriter(unpackWrappedStruct(inherit), cache);
			return (value, view, offset, heap) =>
				writeMembers!(value, view, offset, writeBase(value, view, offset, heap));
		}
	});
}

function makeTypeWriter(layout: Layout, cache: Cache): Writer {
	return getOrSet(cache.writer, layout, () => {

		if (typeof layout === 'string') {
			// Basic types
			switch (layout) {
				case 'int8': return (value, view, offset, heap) => ((view.int8[offset] = value, heap));
				case 'int16': return (value, view, offset, heap) => ((view.int16[offset >>> 1] = value, heap));
				case 'int32': return (value, view, offset, heap) => ((view.int32[offset >>> 2] = value, heap));

				case 'uint8': return (value, view, offset, heap) => ((view.uint8[offset] = value, heap));
				case 'uint16': return (value, view, offset, heap) => ((view.uint16[offset >>> 1] = value, heap));
				case 'uint32': return (value, view, offset, heap) => ((view.uint32[offset >>> 2] = value, heap));

				case 'double': return (value, view, offset, heap) => ((view.double[offset >>> 3] = value, heap));

				case 'bool': return (value: boolean, view, offset, heap) => ((view.int8[offset] = value ? 1 : 0, heap));

				case 'buffer': return (value: Uint8Array, view, offset, heap) => {
					const { length } = value;
					view.int32[offset >>> 2] = heap;
					view.int32[(offset >>> 2) + 1] = length;
					view.uint8.set(value, heap);
					return heap + length;
				};

				case 'string': return (value: string, view, offset, heap) => {
					// Attempt to write as latin1 and fall back to utf-16 if needed
					const { length } = value;
					view.int32[offset >>> 2] = heap;
					for (let ii = 0; ii < length; ++ii) {
						const code = value.charCodeAt(ii);
						const stringOffset = heap;
						if (code < 0x100) {
							view.uint8[stringOffset + ii] = code;
						} else {
							// UTF-16 wide characters
							const stringOffset16 = heap >>> 1;
							for (let ii = 0; ii < length; ++ii) {
								view.uint16[stringOffset16 + ii] = value.charCodeAt(ii);
							}
							view.int32[(offset >>> 2) + 1] = -length;
							return heap + length * 2;
						}
					}
					// Succeeded writing latin1
					view.int32[(offset >>> 2) + 1] = length;
					return heap + length;
				};

				default: throw TypeError(`Invalid literal layout: ${layout}`);
			}
		}

		if ('array' in layout) {
			// Array with fixed element size
			const { length, stride } = layout;
			const elementLayout = layout.array;
			const write = makeTypeWriter(elementLayout, cache);
			return (value, view, offset, heap) => {
				let currentOffset = offset;
				for (let ii = 0; ii < length; ++ii) {
					write(value[ii], view, currentOffset, 0);
					currentOffset += stride;
				}
				return heap;
			};

		} else if ('composed' in layout) {
			// Composed value
			const { composed, interceptor } = layout;
			const write = makeTypeWriter(composed, cache);
			if ('decompose' in interceptor) {
				return (value, view, offset, heap) => write(interceptor.decompose(value), view, offset, heap);
			} else if ('decomposeIntoBuffer' in interceptor) {
				return (value, view, offset, heap) => ((interceptor.decomposeIntoBuffer(value, view, offset), heap));
			} else {
				return write;
			}

		} else if ('constant' in layout) {
			return (value, view, offset, heap) => heap;

		} else if ('enum' in layout) {
			// Enumerated types
			const enumMap = new Map(layout.enum.map((value, ii) => [ value, ii ]));
			return (value, view, offset, heap) => ((view.uint8[offset] = enumMap.get(value)!, heap));

		} else if ('list' in layout) {
			// Vector with dynamic element size
			const { size, list: elementLayout } = layout;
			const align = Math.max(kPointerSize, layout.align);
			const write = makeTypeWriter(elementLayout, cache);
			return (value, view, offset, heap) => {
				let prevOffset = offset + kPointerSize;
				let end = heap;
				for (const element of value) {
					const currentOffset = alignTo(end + kPointerSize, align);
					view.int32[(prevOffset >>> 2) - 1] = currentOffset;
					end = write(element, view, currentOffset, currentOffset + size);
					prevOffset = currentOffset;
				}
				view.int32[(prevOffset >>> 2) - 1] = 0;
				return end;
			};

		} else if ('named' in layout) {
			// Named type
			return makeTypeWriter(layout.layout, cache);

		} else if ('optional' in layout) {
			// Small optional element
			const { size, optional: elementLayout } = layout;
			const write = makeTypeWriter(elementLayout, cache);
			return (value, view, offset, heap) => {
				if (value === undefined) {
					view.int8[offset + size] = 0;
					return heap;
				} else {
					view.int8[offset + size] = 1;
					return write(value, view, offset, heap);
				}
			};

		} else if ('pointer' in layout) {
			// Optional element implemented as pointer
			const { align, size, pointer: elementLayout } = layout;
			const write = makeTypeWriter(elementLayout, cache);
			return (value, view, offset, heap) => {
				if (value === undefined) {
					view.int32[offset >>> 2] = 0;
					return heap;
				} else {
					const payloadOffset = alignTo(heap, align);
					view.int32[offset >>> 2] = payloadOffset;
					return write(value, view, payloadOffset, payloadOffset + size);
				}
			};

		} else if ('struct' in layout) {
			// Structured types
			const writeMembers = makeMemberWriter(layout, cache);
			return (value, view, offset, heap) => writeMembers(value, view, offset, heap);

		} else if ('variant' in layout) {
			// Variant types
			const variantMap = new Map(layout.variant.map((element, ii): [ string | number, Writer ] => {
				const { align, size } = element;
				const layout = unpackWrappedStruct(element.layout);
				const write = makeTypeWriter(layout, cache);
				return [
					layout.variant!,
					(value, view, offset, heap) => {
						const payloadOffset = alignTo(heap, align);
						view.int32[offset >>> 2] = payloadOffset;
						view.uint8[offset + kPointerSize] = ii;
						return write(value, view, payloadOffset, payloadOffset + size);
					},
				];
			}));
			return (value, view, offset, heap) => variantMap.get(value[Variant])!(value, view, offset, heap);

		} else if ('vector' in layout) {
			// Vector with fixed element size
			const { align, size, vector: elementLayout } = layout;
			const write = makeTypeWriter(elementLayout, cache);
			return (value, view, offset, heap) => {
				let length = 0;
				let currentOffset = heap;
				for (const element of value) {
					++length;
					currentOffset = alignTo(currentOffset, align);
					write(element, view, currentOffset, 0);
					currentOffset += size;
				}
				view.int32[offset >>> 2] = heap;
				view.int32[(offset >>> 2) + 1] = length;
				return currentOffset;
			};
		}

		throw new Error('Unknown layout');
	});
}

const bufferCache = runOnce(() => BufferView.fromTypedArray(new Uint8Array(1024 * 1024 * 16)));

export function makeWriter<Type extends Format>(format: Type, cache = new Cache) {
	const { layout, traits } = getLayout(format, cache);
	const write = makeTypeWriter(layout, cache);
	return (value: ShapeOf<Type>): Readonly<Uint8Array> => {
		const view = bufferCache();
		const length = write(value, view, 0, traits.size);
		if (length > view.int8.length) {
			throw new Error('Exceeded memory write buffer');
		}
		const copy = new Uint8Array(new SharedArrayBuffer(length));
		copy.set(view.uint8.subarray(0, length));
		return copy;
	};
}
