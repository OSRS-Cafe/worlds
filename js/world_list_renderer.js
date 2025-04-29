import { AccessFilter } from "./access_filter.js";
import { LocationFilter } from "./location_filter.js";
import { PlayerCountFilter } from "./player_count_filter.js";
import { RefreshManager } from "./refresh_manager.js";
import { ActivityFilter, ActivityType} from "./activity_filter.js";

export const SortType = Object.freeze({
    WORLD_NAME: {
        label: "Name",
    },
    WORLD_ID: {
        label: "ID",
    },
    WORLD_PLAYER_COUNT: {
        label: "Players",
    },
    WORLD_LOCATION: {
        label: "Location",
    },
    WORLD_ACTIVITY: {
        label: "Activity",
    }
});

export const SortMode = Object.freeze({
    NONE: {
        emoji: "↕️"
    },
    ASCENDING: {
        emoji: "⬇️"
    },
    DESCENDING: {
        emoji: "⬆️"
    }
});

export class WorldListRenderer {
    #world_list_root;
    #world_player_count;
    #sort_type = SortType.WORLD_PLAYER_COUNT;
    #sort_mode = SortMode.ASCENDING;

    #sort_func = (world_a, world_b) => {
        switch(this.#sort_type) {
            case SortType.WORLD_PLAYER_COUNT:
                switch(this.#sort_mode) {
                    case SortMode.ASCENDING: return world_a.players - world_b.players;
                    case SortMode.DESCENDING: return world_b.players - world_a.players;
                }
                break;
            case SortType.WORLD_ID:
                switch(this.#sort_mode) {
                    case SortMode.ASCENDING: return world_a.id - world_b.id;
                    case SortMode.DESCENDING: return world_b.id - world_a.id;
                }
                break;
            case SortType.WORLD_NAME:
                switch(this.#sort_mode) {
                    case SortMode.ASCENDING: return world_a.name.localeCompare(world_b.name);
                    case SortMode.DESCENDING: return world_b.name.localeCompare(world_a.name);
                }
                break;
            case SortType.WORLD_ACTIVITY:
                switch(this.#sort_mode) {
                    case SortMode.ASCENDING: return world_a.activity.localeCompare(world_b.activity);
                    case SortMode.DESCENDING: return world_b.activity.localeCompare(world_a.activity);
                }
                break;
            case SortType.WORLD_LOCATION:
                switch(this.#sort_mode) {
                    case SortMode.ASCENDING: return world_a.location.localeCompare(world_b.location);
                    case SortMode.DESCENDING: return world_b.location.localeCompare(world_a.location);
                }
                break;
        }
        return 0;
    }

    constructor(world_list_root, world_player_count) {
        this.#world_list_root = world_list_root;
        this.#world_player_count = world_player_count;
    }

    render() {
        console.log("[WorldListRenderer] Rendering Worlds");
        this.#world_list_root.innerHTML = "<tr></tr>"
        for(const [key, value] of Object.entries(SortType)) {
            let suffix = SortMode.NONE.emoji;
            if(SortType[key] === this.#sort_type) {
                suffix = this.#sort_mode.emoji;
            }

            const tab = document.createElement("th");
            tab.classList.add("world_sort_tab");
            tab.onclick = () => {
                if(SortType[key] === this.#sort_type) {
                    switch(this.#sort_mode) {
                        case SortMode.ASCENDING: this.#sort_mode = SortMode.DESCENDING; break;
                        case SortMode.DESCENDING: this.#sort_mode = SortMode.ASCENDING; break;
                    }
                } else {
                    this.#sort_type = SortType[key];
                    this.#sort_mode = SortMode.ASCENDING;
                }
                this.render();
            };
            tab.innerText = value.label + " " + suffix;
            this.#world_list_root.appendChild(tab);
        }

        const filter_function = (world) => {
            return AccessFilter.check(world) && LocationFilter.check(world) && PlayerCountFilter.check(world) && ActivityFilter.check(world);
        };

        const world_data_latest = RefreshManager.world_data;
        this.#world_player_count.innerText = `There are currently ${world_data_latest.players} players in Gielinor!`;
        world_data_latest.worlds.filter(filter_function).sort(this.#sort_func).forEach((world) => {
            const new_world_root = document.createElement("tr");
            if (world.access === "MEMBERS") {
                new_world_root.style.color = "gold";
            }

            const new_world_name = document.createElement("td");
            new_world_name.innerText = world.name;
            new_world_root.appendChild(new_world_name)

            const new_world_id = document.createElement("td");
            new_world_id.innerText = world.id;
            new_world_root.appendChild(new_world_id)

            const new_world_players = document.createElement("td");
            new_world_players.innerText = world.players;
            new_world_root.appendChild(new_world_players);

            const new_world_loc = document.createElement("td");
            new_world_loc.innerHTML = `<img alt="Location: ${world.location.replace("_", " ").toLowerCase()}" width="32px" src="${LocationFilter.get_flag(world.location)}">`;
            new_world_root.appendChild(new_world_loc)

            const new_world_activity = document.createElement("td");
            const activity_label = ActivityType[world.activity] ?? {label: `Missing ActivityType "${world.activity}"`};
            new_world_activity.innerText = activity_label.label;
            new_world_root.appendChild(new_world_activity)

            this.#world_list_root.appendChild(new_world_root);
        });
    }
}