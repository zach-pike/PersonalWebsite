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

function loadTokensFromLocalStorage(): TokensDTO | null {
    let storedTokenDataStr = localStorage.getItem("tokens");
    return storedTokenDataStr != null ? JSON.parse(storedTokenDataStr) : null;
}

function storeTokensToLocalStorage(tokens: TokensDTO | null) {
    if (!tokens) {
        localStorage.removeItem("tokens");
    } else {
        localStorage.setItem("tokens", JSON.stringify(tokens));
    }
}

async function refreshTokens() {
    let storedTokens = loadTokensFromLocalStorage();
    if (!storedTokens) return false;

    let access = jwtDecode(storedTokens.accessToken);
    let refresh = jwtDecode(storedTokens.refreshToken);

    // is the access token still valid?
    if (access.exp && (access.exp * 1000) > Date.now()) {
        return true;
    }

    // no
    // is the refresh token still valid?
    if (refresh.exp && (refresh.exp * 1000) > Date.now()) {
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
        tokens.set(newTokens);

        return true;
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
    tokens.set(tokenData);

    return true;
}

export function logout() {
    storeTokensToLocalStorage(null);
    tokens.set(null);
}

// Refresh loaded tokens
refreshTokens().then((v) => {
    if (!v) {
        console.log("Session reloaded");
    } else {
        console.log("Session could not be reloaded " + v);
    }
});

export const tokens = writable<TokensDTO | null>(loadTokensFromLocalStorage());
export const userData = writable<JwtUser | null>(null);

// Update the decoded jwt data when the tokens writable is updated
tokens.subscribe((v) => {
    if (!v) {
        userData.set(null);
        return;
    }

    let data = jwtDecode(v.accessToken);
    userData.set(data as JwtUser);
});