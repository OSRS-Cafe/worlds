import { Utils } from "./utils.js";
import { URLManager } from "./url_manager.js";

export const LocationFilterEnum = Object.freeze({
    GERMANY: {
        id: "GERMANY",
        shortId: "DE",
        image: "img/flags/de.svg",
    },
    AUSTRALIA: {
        id: "AUSTRALIA",
        shortId: "AU",
        image: "img/flags/au.svg",
    },
    UNITED_STATES: {
        id: "UNITED_STATES",
        shortId: "US",
        image: "img/flags/us.svg",
    },
    UNITED_KINGDOM: {
        id: "UNITED_KINGDOM",
        shortId: "UK",
        image: "img/flags/gb.svg",
    }
});

function getEnumById(id) {
    return Object.values(LocationFilterEnum).filter(location =>  location.id === id )[0]
}
function getEnumByShortId(shortId) {
    return Object.values(LocationFilterEnum).filter(location =>  location.shortId === shortId )[0]
}

export class LocationFilter {
    static #location_filter = [LocationFilterEnum.GERMANY, LocationFilterEnum.AUSTRALIA, LocationFilterEnum.UNITED_KINGDOM, LocationFilterEnum.UNITED_STATES]; // default
    static #buttons;

    static check(world) {
        const world_location = getEnumById(world.location);
        return this.#location_filter.includes(world_location);
    }

    static get_flag(location) {
        return getEnumById(location).image;
    }

    static refresh_button_styles() {
        for(const button of this.#buttons) {
            const location = getEnumById(button.getAttribute("key"));
            if(this.#location_filter.includes(location)) {
                button.classList.remove("grayscale");
            } else {
                button.classList.add("grayscale");
            }
        }
    }

    static start(buttons, world_list_renderer) {
        console.log(`[LocationFilter] init`);
        this.#buttons = buttons;

        const initial_location_filter = URLManager.get_filter("location");
        if(initial_location_filter != null) {
            this.#location_filter = initial_location_filter.split(";").map(location => {
                return getEnumByShortId(location)
            });
        }
        this.refresh_button_styles();

        for(const button of buttons) {
            const location = getEnumById(button.getAttribute("key"));
            button.onclick = () => {
                if(this.#location_filter.includes(location)) {
                    Utils.remove_from_array(this.#location_filter, location);
                } else {
                    this.#location_filter.push(location);
                }
                this.refresh_button_styles();
                world_list_renderer.render();

                const url_location_filter = this.#location_filter.map(loc => loc.shortId).join(";");//this.#location_filter.map((loc) => { return loc.shortId; }).join(";");
                URLManager.set_filter("location", url_location_filter);
            };
        }

    }
}