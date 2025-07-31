export function getServerURL() {
    if (import.meta.env.DEV) {
        return "http://localhost:3000";
    } else {
        return "https://api.zpike.net";
    }
}