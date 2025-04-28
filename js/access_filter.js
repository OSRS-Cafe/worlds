export const AccessType = Object.freeze({
    NONE: {
        id: "none",
        image: "img/star_both.png",
    },
    FREE: {
        id: "free",
        image: "img/star_free.png",
    },
    MEMBERS: {
        id: "members",
        image: "img/star_members.png",
    }
});

export class AccessFilter {
    static #access_type = AccessType.NONE;

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