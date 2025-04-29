import { URLManager } from "./url_manager.js";

export const AccessType = Object.freeze({
    NONE: {
        id: "NONE",
        image: "img/star_both.png",
    },
    FREE: {
        id: "FREE",
        image: "img/star_free.png",
    },
    MEMBERS: {
        id: "MEMBERS",
        image: "img/star_members.png",
    }
});

function getById(id) {
    for(const type of Object.entries(AccessType)) {
        if(type[1].id === id) return type[1];
    }
    return null;
}

export class AccessFilter {
    static #access_type = getById(URLManager.get_access_filter()) ?? AccessType.NONE;

    static #access_filter_button;

    static check(world) {
        if(this.#access_type === AccessType.NONE) return true;
        return this.#access_type.id.toLowerCase() === world.access.toLowerCase();
    }

    static #toggle() {
        switch(this.#access_type) {
            case AccessType.NONE:    this.#access_type = AccessType.FREE;     break;
            case AccessType.FREE:    this.#access_type = AccessType.MEMBERS;  break;
            case AccessType.MEMBERS: this.#access_type = AccessType.NONE;     break;
        }
        URLManager.set_access_filter(this.#access_type.id);
    }

    static #update_button_image() {
        this.#access_filter_button.src = this.#access_type.image;
    }

    static start(access_filter_button, world_list_renderer) {
        console.log(`[AccessFilter] init`);
        this.#access_filter_button = access_filter_button;

        this.#access_filter_button.onclick = () => {
            this.#toggle();
            this.#update_button_image();
            world_list_renderer.render();
        };

        this.#update_button_image();
    }
}