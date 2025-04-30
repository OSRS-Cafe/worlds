import { Utils } from './utils.js';
import { RefreshManager } from './refresh_manager.js';
import { PlayerCountFilter } from './player_count_filter.js';
import { AccessFilter } from './access_filter.js';
import { LocationFilter } from "./location_filter.js";
import { WorldListRenderer } from "./world_list_renderer.js";
import { ActivityFilter } from "./activity_filter.js";

//Enforce HTTPS (https://stackoverflow.com/a/4723302)
if (location.host !== "127.0.0.1" && location.protocol !== 'https:' && location.protocol !== 'file:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

console.log(`[Worlds @ OSRS.Cafe] Welcome! Enjoy your stay!`);

const world_renderer = new WorldListRenderer({
    world_list_root: Utils.get_element_by_id("world-list"),
    world_player_count: Utils.get_element_by_id("player-count")
});

PlayerCountFilter.start({
    player_count_filter_button: Utils.get_element_by_id("player_chooser_type"),
    player_count_filter_left: Utils.get_element_by_id("player_chooser_left"),
    player_count_filter_right: Utils.get_element_by_id("player_chooser_right"),
    world_list_renderer: world_renderer
});

LocationFilter.start({
    buttons: Utils.get_elements_by_class_name("loc_filter_button"),
    world_list_renderer: world_renderer
});

AccessFilter.start({
    access_filter_button: Utils.get_element_by_id("access_btn"),
    world_list_renderer: world_renderer
});

ActivityFilter.start({
    dropdown: Utils.get_element_by_id("activity-dropdown"),
    world_list_renderer: world_renderer
});

RefreshManager.start({
    countdown_label: Utils.get_element_by_id("refresh-countdown"),
    refresh_button: Utils.get_element_by_id("refresh-countdown-button"),
    world_list_renderer: world_renderer
});