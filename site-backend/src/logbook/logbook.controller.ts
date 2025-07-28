import { Controller, Get, Query } from '@nestjs/common';

@Controller('logbook')
export class LogbookController {
    @Get('recent')
    async getRecentLogs(@Query("n") n: string | null) {
        let count = n ? parseInt(n) : 5;

        console.log(count);

        return [
            {
                band: "10/11m (CB)",
                quality: 5,
                callsign: "555",
                location: "Missouri",
                notes: "None"
            },
            {
                band: "10/11m (CB)",
                quality: 8,
                callsign: "777",
                location: "Montana",
                notes: "Long conversation"
            }
        ]
    }
}
