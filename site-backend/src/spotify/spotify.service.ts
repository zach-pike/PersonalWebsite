import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SpotifyService {
    accessToken: string = "";
    accessTokenExpiary: number = 0;

    refreshToken: string = "";

    loadTokensFromFile() {
        try {
            let accessTokenParts = fs.readFileSync(path.join(process.cwd(), 'spotify_access_token.txt'), 'utf8').split(':');
            this.accessToken = accessTokenParts[0];
            this.accessTokenExpiary = parseInt(accessTokenParts[1], 10);
            this.refreshToken = fs.readFileSync(path.join(process.cwd(), 'spotify_refresh_token.txt'), 'utf8');
        } catch(e) {
            console.log("Could not relog into spotify");
        }
    }

    storeTokensToFile() {
        fs.writeFileSync(
            path.join(
                process.cwd(), 
                'spotify_access_token.txt'
            ), 
            `${this.accessToken}:${this.accessTokenExpiary}`
        );

        fs.writeFileSync(
            path.join(
                process.cwd(),
                'spotify_refresh_token.txt'
            ),
            this.refreshToken
        );
    }

    constructor() {
        // Attempt to load tokens from file
        this.loadTokensFromFile();
    }

    async authCallback(code: string): Promise<{access_token: string, refresh_token: string } | null> {
        if (
            !process.env.SPOTIFY_REDIRECT_URI ||
            !process.env.SPOTIFY_CLIENT_ID ||
            !process.env.SPOTIFY_CLIENT_SECRET
        ) return null;

        // If tokens are already defined disallow login
        if (this.accessToken != "" || this.refreshToken != "" || this.accessTokenExpiary != 0)
            return null;

        let params = new URLSearchParams();

        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', process.env.SPOTIFY_REDIRECT_URI);
        params.append('client_id', process.env.SPOTIFY_CLIENT_ID);
        params.append('client_secret', process.env.SPOTIFY_CLIENT_SECRET);

        let req = await fetch(
            `https://accounts.spotify.com/api/token?${params.toString()}`,
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }
        );

        if (!req.ok) return null;

        let tokens = await req.json();

        let expiaryTime = Date.now() + (tokens.expires_in * 1000);

        this.accessToken = tokens.access_token;
        this.refreshToken = tokens.refresh_token;
        this.accessTokenExpiary = expiaryTime;

        this.storeTokensToFile();

        return tokens;
    }

    isTokenExpired() {
        return this.accessTokenExpiary < Date.now();
    }

    async refreshSpotifyToken() {
        if (
            !process.env.SPOTIFY_CLIENT_ID ||
            !process.env.SPOTIFY_CLIENT_SECRET
        ) throw "Spotify variables undefined!";

        let params = new URLSearchParams();

        params.append('grant_type', 'refresh_token');
        params.append('refresh_token', this.refreshToken);
        params.append('client_id', process.env.SPOTIFY_CLIENT_ID);
        params.append('client_secret', process.env.SPOTIFY_CLIENT_SECRET);

        let req = await fetch(
            `https://accounts.spotify.com/api/token?${params.toString()}`,
            {
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const data = await req.json();
        let expiaryTime = Date.now() + (data.expires_in * 1000);
        this.accessTokenExpiary = expiaryTime;
        this.accessToken = data.access_token;

        if(data.refresh_token) {
            this.refreshToken = data.refresh_token;
        }

        this.storeTokensToFile();
    }

    async getRecentlyPlayed() {
        // if (this.isTokenExpired())
            await this.refreshSpotifyToken();

        const recentRes = await fetch(
            'https://api.spotify.com/v1/me/player/recently-played?limit=1',
            {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`
                }
            }
        );

        if (!recentRes.ok) return null;

        const json = await recentRes.json();
        const track = json.items[0].track;

        return {
            name: track.name,
            artist: track.artists.map(a => a.name).join(', '),
            album: track.album.name,
            albumArt: track.album.images[0]?.url
        };
    }
}
