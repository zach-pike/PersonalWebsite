import { Controller, Get, HttpException, HttpRedirectResponse, Query, Redirect } from '@nestjs/common';
import { SpotifyService } from './spotify.service';

@Controller('spotify')
export class SpotifyController {
    constructor(private readonly spotifyService: SpotifyService) {}

    @Get('auth')
    @Redirect()
    spotifyAuth(): HttpRedirectResponse {
        if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_REDIRECT_URI) throw "Spotify ENV vars not defined";

        const scopes = 'user-read-recently-played';
        const authURL = `https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(scopes)}`;
    
        return {
            url: authURL,
            statusCode: 302
        };
    }

    @Get('callback')
    async spotifyAuthCallback(@Query('code') spotifyCode: string | null) {
        if (!spotifyCode) throw new HttpException("No code specified in callback query params!", 400);

        let tokens = await this.spotifyService.authCallback(spotifyCode);
        if (!tokens) throw new HttpException("Failed to login!", 400);

        return "Logged In!";
    }

    @Get('recentlyPlayed')
    async recentlyPlayed() {
        let a = await this.spotifyService.getRecentlyPlayed();

        if (!a) return new HttpException("error fetching recent played", 500);

        return a;
    }
}
