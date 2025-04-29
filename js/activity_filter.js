import { Utils } from "./utils.js";
import { URLManager } from "./url_manager.js";

export const ActivityType = Object.freeze({
    NONE: {
        short_id: 0,
        label: "None",
    },
    SKILL_TOTAL_500: {
        short_id: 1,
        label: "Skill Total 500",
    },
    SKILL_TOTAL_750: {
        short_id: 2,
        label: "Skill Total 750",
    },
    SKILL_TOTAL_1250: {
        short_id: 3,
        label: "Skill Total 1250",
    },
    SKILL_TOTAL_1500: {
        short_id: 4,
        label: "Skill Total 1500",
    },
    SKILL_TOTAL_1750: {
        short_id: 5,
        label: "Skill Total 1750",
    },
    SKILL_TOTAL_2000: {
        short_id: 6,
        label: "Skill Total 2000",
    },
    SKILL_TOTAL_2200: {
        short_id: 7,
        label: "Skill Total 2200"
    },
    FALADOR_PARTY_ROOM: {
        short_id: 8,
        label: "Falador Party Room"
    },
    BLAST_FURNACE: {
        short_id: 9,
        label: "Blast Furnace",
    },
    HOUSE_PARTY_GILDED_ALTAR: {
        short_id: 10,
        label: "House Party - Gilded Altar"
    },
    ROYAL_TITANS: {
        short_id: 11,
        label: "Royal Titans"
    },
    TEMPOROSS: {
        short_id: 12,
        label: "Tempoross"
    },
    PEST_CONTROL: {
        short_id: 13,
        label: "Pest Control"
    },
    THEATRE_OF_BLOOD: {
        short_id: 14,
        label: "Theatre Of Blood"
    },
    WINTERTODT: {
        short_id: 15,
        label: "Wintertodt"
    },
    TROUBLE_BREWING: {
        short_id: 16,
        label: "Trouble Brewing"
    },
    GUARDIANS_OF_THE_RIFT: {
        short_id: 17,
        label: "Guardians of the Rift"
    },
    FRESH_START: {
        short_id: 18,
        label: "Fresh Start"
    },
    FORESTRY: {
        short_id: 19,
        label: "Forestry"
    },
    LMS_CASUAL: {
        short_id: 20,
        label: "LMS Casual"
    },
    HIGH_RISK_WORLD: {
        short_id: 21,
        label: "High Risk World"
    },
    DEADMAN: {
        short_id: 22,
        label: "Deadman"
    },
    CLAN_WARS_FREE_FOR_ALL: {
        short_id: 23,
        label: "Clan Wars - Free for All"
    },
    SPEEDRUNNING_WORLD: {
        short_id: 24,
        label: "Speedrunning World"
    },
    BOUNTY_HUNTER_WORLD: {
        short_id: 25,
        label: "Bounty Hunter World"
    },
    ZALCANO: {
        short_id: 26,
        label: "Zalcano"
    },
    FISHING_TRAWLER: {
        short_id: 27,
        label: "Fishing Trawler"
    },
    VOLCANIC_MINE: {
        short_id: 28,
        label: "Volcanic Mine"
    },
    ROLEPLAYING: {
        short_id: 29,
        label: "Role-Playing"
    },
    BARBARIAN_ASSAULT: {
        short_id: 30,
        label: "Barbarian Assault"
    },
    GROUP_SKILLING: {
        short_id: 31,
        label: "Group Skilling"
    },
    TZHAAR_FIGHT_PIT: {
        short_id: 32,
        label: "TzHaar Fight Pit"
    },
    SOUL_WARS: {
        short_id: 33,
        label: "Soul Wars"
    },
    GROUP_PVM: {
        short_id: 34,
        label: "Group PvM"
    },
    TOMBS_OF_AMASCUT: {
        short_id: 35,
        label: "Tombs of Amascut"
    },
    PVP_ARENA_AUS: {
        short_id: 36,
        label: "PvP Arena (AUS)"
    },
    PVP_ARENA_US: {
        short_id: 37,
        label: "PvP Arena (US)"
    },
    PVP_ARENA_UK: {
        short_id: 38,
        label: "PvP Arena (UK)"
    },
    PVP_ARENA_LEGACY_DUELS: {
        short_id: 39,
        label: "PvP Arena (Legacy Duels)"
    },
    PVP_WORLD_FREE: {
        short_id: 40,
        label: "PVP World (Free)"
    },
    PVP_WORLD: {
        short_id: 41,
        label: "PvP World"
    },
    PVP_WORLD_HIGH_RISK: {
        short_id: 42,
        label: "PvP World - High Risk"
    },
    CASTLE_WARS_1: {
        short_id: 43,
        label: "Castle Wars (1)"
    },
    CASTLE_WARS_2: {
        short_id: 44,
        label: "Castle Wars (2)"
    },
    CASTLE_WARS_FREE: {
        short_id: 45,
        label: "Castle Wars (Free)"
    },
    AGILITY_TRAINING: {
        short_id: 46,
        label: "Agility Training"
    },
    NEX_FFA: {
        short_id: 47,
        label: "NEX FFA"
    },
    LMS_COMPETITIVE: {
        short_id: 48,
        label: "LMS Competitive"
    },
    WILDERNESS_PK_MEMBERS: {
        short_id: 49,
        label: "Wilderness PK (Members)"
    },
    WILDERNESS_PK_FREE: {
        short_id: 50,
        label: "Wilderness PK (Free)"
    },
    TRADE_FREE: {
        short_id: 51,
        label: "Trade (Free)"
    },
    TRADE__MEMBERS: {
        short_id: 52,
        label: "Trade (Members)"
    },
    CLAN_RECRUITMENT: {
        short_id: 53,
        label: "Clan Recruitment"
    },
    SULLIUSCEP_CUTTING: {
        short_id: 54,
        label: "Sulliuscep Cutting"
    },
    BRIMHAVEN_AGILITY: {
        short_id: 55,
        label: "Brimhaven Agility"
    },
    BRIMHAVEN_AGILITY_ARENA: {
        short_id: 56,
        label: "Brimhaven Agility Arena"
    },
    PYRAMID_PLUNDER: {
        short_id: 57,
        label: "Pyramid Plunder"
    },
    BURTHORPE_GAMES_ROOM: {
        short_id: 58,
        label: "Burthorpe Games Room"
    },
    NIGHTMARE_OF_ASHIHAMA: {
        short_id: 59,
        label: "Nightmare of Ashihama"
    },
    MORT_TON_TEMPLE_RAT_PITS: {
        short_id: 60,
        label: "Mort'ton temple, Rat Pits"
    },
    OURANIA_ALTAR: {
        short_id: 61,
        label: "Ourania Altar"
    },
    TOA_FFA: {
        short_id: 62,
        label: "TOA FFA"
    },
    VARLAMORE_PVM: {
        short_id: 63,
        label: "Varlamore PvM"
    },
    ZEAH_RUNECRAFTING: {
        short_id: 64,
        label: "Zeah Runecrafting"
    },
    UNKNOWN: {
        short_id: -1,
        label: "Unknown"
    }
});

function getEnumByShortId(short_id) {
    return Object.values(ActivityType).filter(activity =>  activity.short_id == short_id )[0]
}

export class ActivityFilter {
    static #activities = []; // TODO: Dont store strings but enums
    static #dropdown;

    static check(world) {
        if(this.#activities.length === 0) return true;
        return this.#activities.includes(ActivityType[world.activity]);
    }

    static #refresh_dropdown() {
        // Clear the dropdown choices
        this.#dropdown.innerHTML = "";

        // Dropdown display, not displayed in dropdown
        const label = document.createElement("option");
        label.textContent = "Toggle Activities";
        label.hidden = true;
        this.#dropdown.appendChild(label);

        // Selected Activity Choices
        for (const [key, value] of Object.entries(ActivityType)) {
            if(this.#activities.includes(value)) {
                const activity_option = document.createElement("option");
                activity_option.textContent = `☑️ ${value.label}`;
                activity_option.value = key;
                this.#dropdown.appendChild(activity_option);
            }
        }

        // Separator, only visible if something is selected
        if(this.#activities.length !== 0) {
            const label2 = document.createElement("option");
            label2.textContent = "--------------------------";
            this.#dropdown.appendChild(label2);
        }

        // All other Activities
        for (const [key, value] of Object.entries(ActivityType)) {
            if(!this.#activities.includes(value)) {
                const activity_option = document.createElement("option");
                activity_option.textContent = value.label;
                activity_option.value = key;
                this.#dropdown.appendChild(activity_option);
            }
        }
    }

    static start(dropdown, world_list_renderer) {
        this.#dropdown = dropdown;
        this.#dropdown.onchange = () => {
            if(this.#activities.includes(this.#dropdown.value)) {
                Utils.remove_from_array(this.#activities, ActivityType[this.#dropdown.value]);
            } else {
                this.#activities.push(ActivityType[this.#dropdown.value]);
            }
            this.#refresh_dropdown();
            world_list_renderer.render();
            URLManager.set_filter("activity", this.#activities.map(activity => activity.short_id).join(";"));
        };

        const supplied_filter = URLManager.get_filter("activity");
        if(supplied_filter != null) {
            this.#activities = supplied_filter.split(";").map(short_id => getEnumByShortId(short_id));
        }

        this.#refresh_dropdown();
    }
}