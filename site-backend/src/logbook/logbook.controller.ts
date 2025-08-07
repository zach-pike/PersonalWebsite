import { Body, Controller, Get, HttpException, Post, Query, Request, UseGuards } from '@nestjs/common';
import { LogbookService } from './logbook.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { LogEntryDTO } from './dto/logentry.dto';
import { JwtUser } from 'src/auth/interfaces/jwtuser.interface';

@Controller('logbook')
export class LogbookController {
    constructor(private readonly logbookService: LogbookService) {}
    
    @Get('recent')
    async getRecentLogs() {
        return this.logbookService.loadPosts();
    }

    @Post('new')
    @UseGuards(AuthGuard, RoleGuard('admin'))
    async newPost(@Request() { user }: { user: JwtUser }, @Body() data: LogEntryDTO) {
        let res = await this.logbookService.createNewPost(user._id, data);

        if (!res) throw new HttpException("Error saving to DB!", 500);
        return "OK";
    }
}
