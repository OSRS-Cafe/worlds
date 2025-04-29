export class URLManager {
    static set_filter(key, filter) {
        let current = new URL(document.URL);
        current.searchParams.set(key, filter);

        if(filter === "")
            current.searchParams.delete(key);

        history.replaceState("", "", current.href);
    }

    static get_filter(key) {
        return new URL(document.URL).searchParams.get(key);
    }
}