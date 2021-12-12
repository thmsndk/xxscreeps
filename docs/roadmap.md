This is currently a draft / work in progress.

This is a roadmap & attempt to highlight where you could start contributing to bring xxscreeps to feature parity with the official & private servers

Writing tests to verify the functionality we expect is one of the main places you could contribute. Once the tests are in place you can decide if you want to fully implement them as welll.

See https://github.com/laverdet/xxscreeps#getting-started and https://github.com/laverdet/xxscreeps#contributing as well

example of writing tests https://github.com/laverdet/xxscreeps/pull/40/files


| | Symbol Explanation |
|:---:| :--- |
|✔| Done ||
|(✔)| Done? - needs verification ||
|❌| Not Done||
|🚀| Open ||

# Game 
| Status | Feature | Test Coverage | Notes |
| :---: |:---|:---:| :--- |
|| **RCL 0**||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Road | | [pathfinder tests with roads]((src/mods/road/test.ts))
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Container ||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Flag ||
|(✔)| &nbsp;&nbsp;&nbsp;&nbsp;construction site || lots of tests missing in regards to if a creep can build csites. range, resource, safemode, obstacles RCL and such
|| **RCL 1**||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Controller ||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Spawn |100| [test](src/mods/spawn/test.ts) verifies spawn direction, setting direction, cancel spawning, selecting extensions for energy, renewing TTL, destroy, unclaim
|| **RCL 2**||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Extension x 5 ||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Rampart || [#35](https://github.com/laverdet/xxscreeps/issues/35)
|| &nbsp;&nbsp;&nbsp;&nbsp;ConstructedWall ||
|| **RCL 3**||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Extension x 10 || 
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Tower ||
|| **RCL 4**||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Extension x 20 || 
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Storage ||
|| **RCL 5**||
|✔| Extension x 30 || 
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Tower x 2 ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Link x 2||
|| **RCL 6**||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;[Lab x3](src/mods/chemistry/lab.ts) ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Terminal ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Extractor ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Link x3||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Extension x 40 || 
|| **RCL 7**||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Can build 2 spawns ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Can loose structures due to RCL downgrade ||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Extension x 50 || 
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Extensions contains 100 capacity ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Factory ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;[Lab x6](src/mods/chemistry/lab.ts) ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Tower x 3 ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Link x 4||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Spawn x 2| |
|| **RCL 8**||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Extension x 60 || 
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Extensions contains 200 capacity ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Can build 3 spawns ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Nuke ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Nuker ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;[Lab x10](src/mods/chemistry/lab.ts) ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Tower x 6 ||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Observer |100| [test](src/mods/observer/test.ts) verifies observer visibility, range and RCL levels, seems complete
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Link x 6 ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Power Spawn ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;PowerCreep ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Power Bank ||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Spawn x 3| |
|| **Game Api**||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Room||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Pathfinder||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Constants ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;market||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;room visuals|| The overmind dashboard completely renders, as well as dotted lines and circles.
|❌| &nbsp;&nbsp;&nbsp;&nbsp;map visuals||   [#17](https://github.com/laverdet/xxscreeps/issues/17)
|❌| &nbsp;&nbsp;&nbsp;&nbsp;creep || [tests](src/mods/creep/test.ts) following, swapping, but what is swapping second? and swapping fast?, safemode, edge fatique, pull. need to verify if we are missing some test cases. perhaps clarify some of them.
|❌| &nbsp;&nbsp;&nbsp;&nbsp;creep movement|| An experimental / changed movement implementation has been made
|| **Misc Features**||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Tombstone ||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Downgrade of RCL || [#33](https://github.com/laverdet/xxscreeps/issues/33) should disable structures you can't build like spawn, extension, tower, labs
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Safe Mode|| [PR #40](https://github.com/laverdet/xxscreeps/pull/40/files) adds a bunch of tests in regards to safemode
|❌| &nbsp;&nbsp;&nbsp;&nbsp;inactive buildings || extensions, spawns, towers due to RCL downgrades
|❌| &nbsp;&nbsp;&nbsp;&nbsp;GCL|| Based on the overview, we are not gaining GCL
|❌| &nbsp;&nbsp;&nbsp;&nbsp;[Map]((src/game/map.ts)) ||  
|❌| &nbsp;&nbsp;&nbsp;&nbsp;invaders||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;construction site stomping ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;simultaneous actions|| [simultaneous actions article](https://docs.screeps.com/s🚀imultaneous-actions.html)
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Deposit ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Mineral ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Resource |[?](src/mods/resource/test.ts)| tests are present that verify the store works with a🚀ll resource constants
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Ruin ||
|✔| &nbsp;&nbsp;&nbsp;&nbsp;Source || 
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Source increase on claim/reservation and decrease on expiration/unclaim || MMO has sources increase to 3000 on claim, check [this](https://github.com/laverdet/xxscreeps/projects/1#card-68090818).
|❌| &nbsp;&nbsp;&nbsp;&nbsp;InvaderCore || strongholds
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Keeper Lair ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Portal ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Event Log || [#39](https://github.com/laverdet/xxscreeps/issues/39) [project card](https://github.com/laverdet/xxscreeps/projects/1#card-65749335)
|❌| &nbsp;&nbsp;&nbsp;&nbsp;Bots ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;caravans||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;auth tokens ||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;multiple shards||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;cross shard portals||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;WASM||
|❌| &nbsp;&nbsp;&nbsp;&nbsp;MODS / hooks || Everything is a mod in this implementation, question is if the proper hooks are in place, the backend seems to need a [refactor](https://github.com/laverdet/xxscreeps/projects/1#card-64082426)
|❌| &nbsp;&nbsp;&nbsp;&nbsp;ability to override constants||

# Client Support
| Status | Feature | Test Coverage | Notes |
| :---: |:---|:---:| :--- |
|❌| Connection with tokens ||
|❌| Connection with username ||
|❌| **Market** ||
|❌| Market history ||
||market history|| /api/user/money-history?page=0
|❌| Market orders ||
|❌||| 404 /api/game/market/orders-index
|❌||| 404 /api/game/market/orders?resourceType=energy&shard=null
|❌||| 404 /api/game/market/stats?resourceType=energy&shard=null
|❌| Market my orders ||
|❌||| 404 /api/game/market/my-orders
|❌| **Decorations** ||
|❌|show your decorations|| 404 /api/user/decorations/inventory
|❌|something with your themes?|| 404 /api/user/decorations/themes
|❌|room decorations || 404 /api/game/room-decorations?room=W5N8&shard=shard0
|❌|room decorations || 404 /api/game/room-decorations
|❌|room decorations || 404 /api/game/room-decorations?shard=shard0
|❌| **Leaderboard** ||
|❌| **Messages** ||
|❌| show messages || 404 /api/user/messages/index
|❌| **Overview** ||
|❌|get terrain / room rendering || 404 /api/game/room-terrain?encoded=true should return error
|❌|get terrain || 404 /api/game/room-terrain?encoded=true&shard=shard0
|❌||| GET /api/leaderboard/find?mode=world&username=thmsn returns an empty list
|❌||| GET /api/leaderboard/find?mode=power&username=thmsn returns an empty list
|❌||| GET /api/leaderboard/seasons returns empty seasons
|❌| Stats|| https://github.com/laverdet/xxscreeps/projects/1#card-63686778
|❌||| 404 /api/user/overview?interval=8&statName=energyHarvested
|❌|toggle steam user profile visibility|| /api/user/set-steam-visible


# Backend / Api
| Status | Feature | Test Coverage | Notes |
| :---: |:---|:---:| :--- |
|❌|map pngs?|| 404 /assets/map/W9N11.png?etag=nothing
|❌||| 404 /api/game/world-size?shard=null


# CLI
- add/remove bots?
- strongholds?


This might be interesting to use https://github.com/haadcode/roadmap-generator
example: https://github.com/haadcode/roadmap-generator/blob/master/example/ROADMAP.md#implement-new-project-management-model

