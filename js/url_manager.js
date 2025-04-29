export class URLManager {
    static set_access_filter(filter) {
        let current = new URL(document.URL);
        current.searchParams.set("access", filter);
        history.replaceState("", "", current.href);
    }

    static get_access_filter() {
        let current = new URL(document.URL);
        return current.searchParams.get("access");
    }

    static set_location_filter(filter) {
        let current = new URL(document.URL);
        current.searchParams.set("location", filter);
        history.replaceState("", "", current.href);
    }

    static get_location_filter() {
        let current = new URL(document.URL);
        return current.searchParams.get("location");
    }
}