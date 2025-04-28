export const PlayerCountFilterTypes = Object.freeze({
    ANY:   Symbol("Any"),
    OVER:  Symbol("Over"),
    UNDER: Symbol("Under"),
    BETWEEN: Symbol("Between"),
});

export class PlayerCountFilter {
    static #player_count_filter_type = PlayerCountFilterTypes.ANY
    static #player_count_filter_button;
    static #player_count_filter_left;
    static #player_count_filter_right;
    static #world_list_renderer;

    static check(world) {
        const world_count = world.players;
        const count_left = this.#player_count_filter_left.value ?? 0;
        const count_right = this.#player_count_filter_right.value ?? 0;
        switch(this.#player_count_filter_type) {
            case PlayerCountFilterTypes.ANY: return true;
            case PlayerCountFilterTypes.OVER: return world_count >= count_right;
            case PlayerCountFilterTypes.UNDER: return world_count <= count_right;
            case PlayerCountFilterTypes.BETWEEN: return world_count <= count_right && world_count >= count_left;
        }
    }

    static refresh_button() {
        this.#player_count_filter_button.innerText = this.#player_count_filter_type.description;
        switch (this.#player_count_filter_type) {
            case PlayerCountFilterTypes.ANY:
                this.#player_count_filter_left.style.display = "none";
                this.#player_count_filter_right.style.display = "none";
                break;
            case PlayerCountFilterTypes.OVER:
            case PlayerCountFilterTypes.UNDER:
                this.#player_count_filter_left.style.display = "none";
                this.#player_count_filter_right.style.display = "block";
                break;
            case PlayerCountFilterTypes.BETWEEN:
                this.#player_count_filter_left.style.display = "block";
                this.#player_count_filter_right.style.display = "block";
                break;
        }
    }

    static start(player_count_filter_button, player_count_filter_left, player_count_filter_right, world_list_renderer) {
        this.#player_count_filter_button = player_count_filter_button;
        this.#player_count_filter_left = player_count_filter_left;
        this.#player_count_filter_right = player_count_filter_right;
        this.#world_list_renderer = world_list_renderer;

        this.#player_count_filter_left.onchange = () => { this.#world_list_renderer.render(); };
        this.#player_count_filter_right.onchange = () => { this.#world_list_renderer.render(); };
        this.#player_count_filter_button.onclick = () => {
            switch(this.#player_count_filter_type) {
                case PlayerCountFilterTypes.ANY: this.#player_count_filter_type = PlayerCountFilterTypes.OVER; break;
                case PlayerCountFilterTypes.OVER: this.#player_count_filter_type = PlayerCountFilterTypes.UNDER; break;
                case PlayerCountFilterTypes.UNDER: this.#player_count_filter_type = PlayerCountFilterTypes.BETWEEN; break;
                case PlayerCountFilterTypes.BETWEEN: this.#player_count_filter_type = PlayerCountFilterTypes.ANY; break;
            }
            this.refresh_button();
            this.#world_list_renderer.render();
        };
        this.refresh_button();
    }
}