import { Utils } from "./utils.js";

export const ActivityType = Object.freeze({
    NONE: {
        label: "None",
    },
    SKILL_TOTAL_500: {
        label: "Skill Total 500",
    },
    SKILL_TOTAL_750: {
        label: "Skill Total 750",
    },
    SKILL_TOTAL_1250: {
        label: "Skill Total 1250",
    },
    SKILL_TOTAL_1500: {
        label: "Skill Total 1500",
    },
    SKILL_TOTAL_1750: {
        label: "Skill Total 1750",
    },
    SKILL_TOTAL_2000: {
        label: "Skill Total 2000",
    },
    SKILL_TOTAL_2200: {
        label: "Skill Total 2200"
    },
    FALADOR_PARTY_ROOM: {
        label: "Falador Party Room"
    },
    BLAST_FURNACE: {
        label: "Blast Furnace",
    },
    HOUSE_PARTY_GILDED_ALTAR: {
        label: "House Party - Gilded Altar"
    },
    ROYAL_TITANS: {
        label: "Royal Titans"
    },
    TEMPOROSS: {
        label: "Tempoross"
    },
    PEST_CONTROL: {
        label: "Pest Control"
    },
    THEATRE_OF_BLOOD: {
        label: "Theatre Of Blood"
    },
    WINTERTODT: {
        label: "Wintertodt"
    },
    TROUBLE_BREWING: {
        label: "Trouble Brewing"
    },
    GUARDIANS_OF_THE_RIFT: {
        label: "Guardians of the Rift"
    },
    FRESH_START: {
        label: "Fresh Start"
    },
    FORESTRY: {
        label: "Forestry"
    },
    PVP_WORLD_FREE: {
        label: "PVP World (Free)"
    },
    LMS_CASUAL: {
        label: "LMS Casual"
    },
    HIGH_RISK_WORLD: {
        label: "High Risk World"
    },
    DEADMAN: {
        label: "Deadman"
    },
    CLAN_WARS_FREE_FOR_ALL: {
        label: "Clan Wars - Free for All"
    },
    SPEEDRUNNING_WORLD: {
        label: "Speedrunning World"
    },
    BOUNTY_HUNTER_WORLD: {
        label: "Bounty Hunter World"
    },
    ZALCANO: {
        label: "Zalcano"
    },
    FISHING_TRAWLER: {
        label: "Fishing Trawler"
    },
    VOLCANIC_MINE: {
        label: "Volcanic Mine"
    },
    ROLEPLAYING: {
        label: "Role-Playing"
    },
    BARBARIAN_ASSAULT: {
        label: "Barbarian Assault"
    },
    GROUP_SKILLING: {
        label: "Group Skilling"
    },
    PVP_WORLD: {
        label: "PvP World"
    },
    TZHAAR_FIGHT_PIT: {
        label: "TzHaar Fight Pit"
    },
    SOUL_WARS: {
        label: "Soul Wars"
    },
    GROUP_PVM: {
        label: "Group PvM"
    },
    TOMBS_OF_AMASCUT: {
        label: "Tombs of Amascut"
    },
    PVP_ARENA_AUS: {
        label: "PvP Arena (AUS)"
    },
    PVP_ARENA_US: {
        label: "PvP Arena (US)"
    },
    CASTLE_WARS_1: {
        label: "Castle Wars (1)"
    },
    CASTLE_WARS_2: {
        label: "Castle Wars (2)"
    },
    CASTLE_WARS_FREE: {
        label: "Castle Wars (Free)"
    },
    AGILITY_TRAINING: {
        label: "Agility Training"
    },
    NEX_FFA: {
        label: "NEX FFA"
    },
    LMS_COMPETITIVE: {
        label: "LMS Competitive"
    },
    PVP_ARENA_LEGACY_DUELS: {
        label: "PvP Arena (Legacy Duels)"
    },
    WILDERNESS_PK_MEMBERS: {
        label: "Wilderness PK (Members)"
    },
    WILDERNESS_PK_FREE: {
        label: "Wilderness PK (Free)"
    },
    TRADE_FREE: {
        label: "Trade (Free)"
    },
    TRADE__MEMBERS: {
        label: "Trade (Members)"
    },
    CLAN_RECRUITMENT: {
        label: "Clan Recruitment"
    },
    UNKNOWN: {
        label: "Unknown"
    },
    PVP_WORLD_HIGH_RISK: {
        label: "PvP World - High Risk"
    },
    SULLIUSCEP_CUTTING: {
        label: "Sulliuscep Cutting"
    },
    BRIMHAVEN_AGILITY: {
        label: "Brimhaven Agility"
    },
    BRIMHAVEN_AGILITY_ARENA: {
        label: "Brimhaven Agility Arena"
    },
    PYRAMID_PLUNDER: {
        label: "Pyramid Plunder"
    },
    BURTHORPE_GAMES_ROOM: {
        label: "Burthorpe Games Room"
    },
    NIGHTMARE_OF_ASHIHAMA: {
        label: "Nightmare of Ashihama"
    },
    MORT_TON_TEMPLE_RAT_PITS: {
        label: "Mort'ton temple, Rat Pits"
    },
    OURANIA_ALTAR: {
        label: "Ourania Altar"
    },
    TOA_FFA: {
        label: "TOA FFA"
    },
    PVP_ARENA_UK: {
        label: "PvP Arena (UK)"
    },
    VARLAMORE_PVM: {
        label: "Varlamore PvM"
    },
    ZEAH_RUNECRAFTING: {
        label: "Zeah Runecrafting"
    }
});

export class ActivityFilter {
    static #activities = [];
    static #dropdown;

    static check(world) {
        if(this.#activities.length === 0) return true;
        return this.#activities.includes(world.activity);
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
            if(this.#activities.includes(key)) {
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
            if(!this.#activities.includes(key)) {
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
                Utils.remove_from_array(this.#activities, this.#dropdown.value);
            } else {
                this.#activities.push(this.#dropdown.value);
            }
            this.#refresh_dropdown();
            world_list_renderer.render();
        };
        this.#refresh_dropdown();
    }
}