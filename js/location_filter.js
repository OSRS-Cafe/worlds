import { Utils } from "./utils.js";

export const LocationFilterEnum = Object.freeze({
    GERMANY: {
        id: "GERMANY",
        image: "img/flags/de.svg",
    },
    AUSTRALIA: {
        id: "AUSTRALIA",
        image: "img/flags/au.svg",
    },
    UNITED_STATES: {
        id: "UNITED_STATES",
        image: "img/flags/us.svg",
    },
    UNITED_KINGDOM: {
        id: "UNITED_KINGDOM",
        image: "img/flags/gb.svg",
    }
});

function getEnumById(id) {
    const all = [LocationFilterEnum.GERMANY, LocationFilterEnum.AUSTRALIA, LocationFilterEnum.UNITED_KINGDOM, LocationFilterEnum.UNITED_STATES];
    for(const item of all) {
        if(item.id.toLowerCase() === id.toLowerCase()) {
            return item;
        }
    }
    console.error(`LocationFilter ${id} not found.}`);
    return null;
}

export class LocationFilter {
    static #location_filter = [LocationFilterEnum.GERMANY, LocationFilterEnum.AUSTRALIA, LocationFilterEnum.UNITED_KINGDOM, LocationFilterEnum.UNITED_STATES];
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
            };
        }

    }
}