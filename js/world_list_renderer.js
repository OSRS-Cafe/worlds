import { AccessFilter } from "./access_filter.js";
import { LocationFilter } from "./location_filter.js";
import { PlayerCountFilter } from "./player_count_filter.js";
import { RefreshManager } from "./refresh_manager.js";
import { ActivityStrings } from "./activity_strings.js";

export class WorldListRenderer {
    #world_list_root;
    #world_player_count;

    constructor(world_list_root, world_player_count) {
        this.#world_list_root = world_list_root;
        this.#world_player_count = world_player_count;
    }

    render() {
        console.log("[WorldListRenderer] Rendering Worlds");
        this.#world_list_root.innerHTML = "<tr><th>Name</th><th>Players</th><th>Location</th><th>Activity</th></tr>"

        const filter_function = (world) => { return AccessFilter.check(world) && LocationFilter.check(world) && PlayerCountFilter.check(world) };

        const world_data_latest = RefreshManager.world_data;
        this.#world_player_count.innerText = `There are currently ${world_data_latest.players} players in Gielinor!`;
        world_data_latest.worlds.filter(filter_function).forEach((world) => {
            const new_world_root = document.createElement("tr");
            if(world.access === "MEMBERS") {
                new_world_root.style.color = "gold";
            }

            const new_world_name = document.createElement("td");
            new_world_name.innerText = world.name;
            new_world_root.appendChild(new_world_name)

            const new_world_players = document.createElement("td");
            new_world_players.innerText = world.players;
            new_world_root.appendChild(new_world_players);

            const new_world_loc = document.createElement("td");
            new_world_loc.innerHTML = `<img alt="Location: ${world.location.replace("_", " ").toLowerCase()}" width="32px" src="${LocationFilter.get_flag(world.location)}">`;
            new_world_root.appendChild(new_world_loc)

            const new_world_activity = document.createElement("td");
            new_world_activity.innerText = ActivityStrings[world.activity] ?? `Missing ActivityString "${world.activity}"`;
            new_world_root.appendChild(new_world_activity)

            this.#world_list_root.appendChild(new_world_root);
        });
    }
}