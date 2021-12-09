This is currently a draft / work in progress.

This is a roadmap & attempt to highlight where you could start contributing to bring xxscreeps to feature parity with the official & private servers

Writing tests to verify the functionality we expect is one of the main places you could contribute. Once the tests are in place you can decide if you want to fully implement them as welll.

See https://github.com/laverdet/xxscreeps#getting-started and https://github.com/laverdet/xxscreeps#contributing as well

example of writing tests https://github.com/laverdet/xxscreeps/pull/40/files




Should we have multiple lists? one for game api, one for client support, one for third party endpoints?

| Status | Goal | Test Coverage | Notes |
| :---: |:---|:---:| :--- |
|🚀| **RCL 1**||
|🚀| **RCL 2**||
|🚀| **RCL 3**||
|🚀| **RCL 4**||
|🚀| **RCL 5**||
|🚀| **RCL 6**||
|🚀| **RCL 7**||
|🚀| **RCL 8**||
|❌| inactive buildings || extensions, spawns, towers due to RCL downgrades
|❌| GCL||
|❌| Room||
|❌| Pathfinder||
|❌| Constants ||
|❌| [Map]((src/game/map.ts)) ||  
|❌| map visuals|| #17
|❌| room visuals||
|❌| invaders||
|❌| market||
|❌| construction site || lots of tests missing in regards to if a creep can build csites. range, resource, safemode, obstacles RCL and such
|❌| construction site stomping ||
|❌| creep || [tests](src/mods/creep/test.ts) following, swapping, but what is swapping second? and swapping fast?, safemode, edge fatique, pull. need to verify if we are missing some test cases. perhaps clarify some of them.
|❌| creep movement|| An experimental / changed movement implementation has been made
|❌|simultaneous actions|| [simultaneous actions article](https://docs.screeps.com/s🚀imultaneous-actions.html)
|❌| Deposit ||
|❌| Flag ||
|❌| Mineral ||
|❌| Nuke ||
|❌| Resource |[?](src/mods/resource/test.ts)| tests are present that verify the store works with a🚀ll resource constants
|❌| Ruin ||
|❌| Source ||
|❌| Container ||
|❌| Controller ||
|❌| Extension || #33
|❌| Extractor ||
|❌| Factory ||
|❌| InvaderCore ||
|❌| Keeper Lair ||
|❌| [Lab](src/mods/chemistry/lab.ts) ||
|❌| Link ||
|❌| Nuker ||
|✔| Observer |100| [test](src/mods/observer/test.ts) verifies observer visibility, range and RCL levels, seems complete
|❌| PowerCreep ||
|❌| Power Bank ||
|❌| Power Spawn ||
|❌| Portal ||
|❌| Rampart || #35
|❌| Road | | [pathfinder tests with roads]((src/mods/road/test.ts))
|✔| Spawn |100| [test](src/mods/spawn/test.ts) verifies spawn direction, setting direction, cancel spawning, selecting extensions for energy, renewing TTL, destroy, unclaim
|❌| Storage ||
|❌| Terminal ||
|❌| Tower ||
|❌| Wall ||
|❌| Tombstone ||
|❌| Event Log || #39 [project card](https://github.com/laverdet/xxscreeps/projects/1#card-65749335)
|❌| Stats|| https://github.com/laverdet/xxscreeps/projects/1#card-63686778
|❌| caravans||
|❌| auth tokens ||
|🚀| multiple shards||
|❌| cross shard portals||
|🚀| WASM||
|🚀| MODS / hooks || Everything is a mod in this implementation, question is if the proper hooks are in place, the backend seems to need a [refactor](https://github.com/laverdet/xxscreeps/projects/1#card-64082426)
|❌| ability to override constants||


Source Reservation
MMO has sources increase to 3000 on claim, check this.
https://github.com/laverdet/xxscreeps/projects/1#card-68090818

# External API / Endpoints
Missing endpoints #1 




This might be interesting to use https://github.com/haadcode/roadmap-generator
example: https://github.com/haadcode/roadmap-generator/blob/master/example/ROADMAP.md#implement-new-project-management-model

```json
const symbols = {
  // Issue status
  done: '✔', // or ✅ or '**DONE**'
  notDone: '❌', // or 'OPEN'
  // Milestone status
  open: '🚀', // or 🔔 or ''
  closed: '⭐', // or ''
  // Milestone details
  progress: '📉', // or 'Progress'
  date: '📅', // or 'Estimated Completion'
}
```
