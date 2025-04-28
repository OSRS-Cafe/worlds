import { Utils } from './utils.js';
import { RefreshManager } from './refresh_manager.js';
import { PlayerCountFilter } from './player_count_filter.js';
import { AccessFilter } from './access_filter.js';
import { LocationFilter } from "./location_filter.js";
import { WorldListRenderer } from "./world_list_renderer.js";

//Enforce HTTPS (https://stackoverflow.com/a/4723302)
if (location.host !== "127.0.0.1" && location.protocol !== 'https:' && location.protocol !== 'file:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

console.log(`[Worlds @ OSRS.Cafe] Welcome! Enjoy your stay!`);

const world_renderer = new WorldListRenderer(
    Utils.get_element_by_id("world-list"),
    Utils.get_element_by_id("player-count"),
    Utils.get_element_by_id("player-count-filtered")
);

PlayerCountFilter.start(
    Utils.get_element_by_id("player_chooser_type"),
    Utils.get_element_by_id("player_chooser_left"),
    Utils.get_element_by_id("player_chooser_right"),
    world_renderer
)

LocationFilter.start(
    Utils.get_elements_by_class_name("loc_filter_button"),
    world_renderer
)

AccessFilter.start(
    Utils.get_element_by_id("access_btn"),
    world_renderer
);

RefreshManager.start(
    Utils.get_element_by_id("refresh-countdown"),
    Utils.get_element_by_id("refresh-countdown-button"),
    world_renderer
);