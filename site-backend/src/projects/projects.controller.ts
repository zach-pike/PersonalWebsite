import { Body, Controller, Get, HttpException, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PermissionGuard } from 'src/auth/permission.guard';
import { ProjectsService } from './projects.service';
import { CreateProjectPostDTO } from './dto/createprojectpost.dto';
import { JwtUser } from 'src/auth/interfaces/jwtuser.interface';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post('new')
    @UseGuards(AuthGuard, PermissionGuard('admin.projects.new'))
    async new(@Request() req: { user: JwtUser }, @Body() data: CreateProjectPostDTO) {
        let res = await this.projectsService.newProjectPost(req.user._id, data);

        if (!res) throw new HttpException("Could not save post!", 500);
        return "OK";
    }

    @Get('byId/:id')
    async projByID(@Param('id') id: string) {
        let doc = await this.projectsService.byId(id);

        if (!doc) throw new HttpException("Could not find project with given ID", 400);

        return doc;
    }

    @Get('get')
    async paginationHandler(
        @Query('start') start: number | null,
        @Query('end') end : number | null,
        @Query('info') info: string | null
    ) {
        if (start && end) {
            return await this.projectsService.getPagedItems(start, end);
        } else if (info) {
            switch(info) {
                case "totalItems": {
                    return await this.projectsService.getTotalItems();
                };
            }
        } else {
            throw new HttpException("Unknown request type", 400);
        }
    }
}
