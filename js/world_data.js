export class WorldInfo {
    constructor({ name, players, location, access, activity }) {
        this.name = name;
        this.players = players;
        this.location = location;
        this.access = access;
        this.activity = activity;
    }
}

export class WorldsApiResponse {
    constructor({ players, filteredPlayers, worlds }) {
        this.players = players;
        this.filteredPlayers = filteredPlayers;
        this.worlds = [];
        worlds.forEach((json_world) => {
            this.worlds.push(new WorldInfo(json_world));
        });
    }
}

export class WorldsLoader {
    static async get() {
        const url = new URL("https://api-dev.osrs.cafe/worlds");
        console.log(`[RefreshManager] calling ${url}`);
        let json = await (await fetch(url.toString())).json();
        return new WorldsApiResponse(json);
    }
}