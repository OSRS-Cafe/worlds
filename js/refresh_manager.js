import { WorldsLoader } from "./world_data.js";

export class RefreshManager {
    static #refresh_time = 60;
    static #refresh_countdown = -1;
    static #countdown_label;
    static #refresh_button;
    static #world_list_renderer;

    static world_data;

    static #tick() {
        if(this.#refresh_countdown < 0) {
            this.#countdown_label.innerText = "Loading...";
            WorldsLoader.get().then(worldData => {
                this.world_data = worldData;
                this.#world_list_renderer.render();

                this.#refresh_countdown = this.#refresh_time;
                this.#refresh_button.title = `Last refreshed: ${new Date().toString()}`;
            })
        } else {
            this.#countdown_label.innerText = `${this.#refresh_countdown}`;
            this.#refresh_countdown--;
        }
    }

    static #reset() {
        this.#refresh_countdown = -1;
        this.#tick();
    }

    static start({ countdown_label, refresh_button, world_list_renderer }) {
        console.log("[RefreshManager] init");
        this.#countdown_label = countdown_label;
        this.#refresh_button = refresh_button;
        this.#world_list_renderer = world_list_renderer;

        window.setInterval(() => { RefreshManager.#tick(); }, 1000);
        refresh_button.onclick = () => { RefreshManager.#reset(); };

        this.#reset();
    }
}