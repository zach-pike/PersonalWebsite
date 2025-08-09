import { jwtDecode } from "jwt-decode";
import { writable } from "svelte/store";
import { getServerURL } from "./utils";

export interface TokensDTO {
    accessToken: string;
    refreshToken: string;
}

export interface JwtUser {
    username: string;
    displayName: string;
    roles: string[];
    created: number;
    _id: string;
}

export const accessToken = writable<string | null>(null);
export const userData = writable<JwtUser | null>(null);

/**
 * Attempts to load tokens from localStorage, if unsucessful returns null
 */
function loadTokensFromLocalStorage(): TokensDTO | null {
    let storedTokenDataStr = localStorage.getItem("tokens");
    return storedTokenDataStr != null ? JSON.parse(storedTokenDataStr) : null;
}

/**
 * @param tokens Stores tokens when value is non-null & clears localStorage when null is provided
 */
function storeTokensToLocalStorage(tokens: TokensDTO | null) {
    if (!tokens) {
        localStorage.removeItem("tokens");
    } else {
        localStorage.setItem("tokens", JSON.stringify(tokens));
    }
}

/**
 * Attempts to refresh and update the access tokens stored in localStorage, 
 * also updates the accessToken readable and localStorage when successful
 * 
 * returns `true` when successful and `false` on failure
 */
async function refreshTokens(): Promise<boolean> {
    let storedTokens = loadTokensFromLocalStorage();
    if (!storedTokens) return false;

    // Refresh token
    let req = await fetch(
        `${getServerURL()}/auth/refresh`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                refreshToken: storedTokens.refreshToken
            })
        }
    );

    if (!req.ok) return false;

    let newTokens: TokensDTO = await req.json();
    storeTokensToLocalStorage(newTokens);

    // Update writables
    accessToken.set(newTokens.accessToken);

    return true;
}

let refreshTimeoutDescriptor: number | null = null;

/**
 * This function when called will automaticially refresh the access 
 * token when it expires and will continue to do so untill the interval 
 * is cleared
 */
function startRefreshTimeout() {
    let tokens = loadTokensFromLocalStorage();
    if (!tokens) return;

    let decodedAccessToken = jwtDecode(tokens.accessToken);
    if (!decodedAccessToken || !decodedAccessToken.exp) return;

    let timeTillExpiary = decodedAccessToken.exp * 1000 - Date.now();
    console.log(`Refreshing tokens in ${timeTillExpiary}ms`);

    refreshTimeoutDescriptor = setTimeout(async () => {
        // Refresh the tokens
        let a = await refreshTokens();

        if (a) {
            console.log("Refreshed tokens!");

            // if refreshed properly then restart the timer
            startRefreshTimeout()
        } else {
            console.log("Could not refresh tokens");
        }
    }, timeTillExpiary);
}

/**
 * This function attemps to refresh the tokens stored in localstorage,
 * If access token is still valid, it will just restore the accessToken writable from localStorage
 * If access token is expired & refresh token is still valid, it will refresh the accessToken with the server,
 * then updating localStorage & the accessToken writable
 * If both tokens are expired it will fail
 * 
 * Sucess at refreshing returns `true`, while a failure returns `false`
*/
async function tryReloadSession() {
    let storedTokens = loadTokensFromLocalStorage();
    if (!storedTokens) return false;

    let access = jwtDecode(storedTokens.accessToken);
    let refresh = jwtDecode(storedTokens.refreshToken);

    // is the access token still valid?
    if (access.exp && (access.exp * 1000) > Date.now()) {
        // Start the token refresh
        startRefreshTimeout();

        // Restore access token writable
        accessToken.set(storedTokens.accessToken);

        return true;
    }

    // no
    // is the refresh token still valid?
    if (refresh.exp && (refresh.exp * 1000) > Date.now()) {
        let a = await refreshTokens();

        if (a) {
            // Start the token refresh
            startRefreshTimeout();
            return true;
        } else {
            return false;
        }
    }

    // no
    // User will need to login again
    return false;
}

export function getAccessToken() {
    let a = loadTokensFromLocalStorage();
    if (!a) throw "No tokens stored";
    return a.accessToken;
}

export async function login(username: string, password: string) {
    let res = await fetch(
        getServerURL() + "/auth/login",
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                username,
                password
            }),
        },
    );

    if (!res.ok) {
        return false;
    }

    let tokenData = await res.json();
    
    // Update writables && localstorage
    storeTokensToLocalStorage(tokenData);
    accessToken.set(tokenData.accessToken);

    // Start refresh timer
    startRefreshTimeout();

    return true;
}

export function logout() {
    storeTokensToLocalStorage(null);
    accessToken.set(null);

    // Stop refreshing tokens
    if (refreshTimeoutDescriptor) clearTimeout(refreshTimeoutDescriptor);
}

export function initAuth() {
    // Refresh loaded tokens
    tryReloadSession().then((v) => {
        if (v) {
            console.log("Session reloaded");
        } else {
            console.log("Session could not be reloaded ");
        }
    });

    // Update the decoded jwt data when the access token writable is updated
    accessToken.subscribe((v) => {
        if (!v) {
            userData.set(null);
            return;
        }

        let data = jwtDecode(v);
        userData.set(data as JwtUser);
    });
}