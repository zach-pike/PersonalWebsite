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

    @Post('delete')
    @UseGuards(AuthGuard, PermissionGuard('admin.projects.delete'))
    async deleteProject(@Body() body: { toDelete: string }) {
        let a = await this.projectsService.deleteByID(body.toDelete);

        if (!a) throw new HttpException("Failed to delete document!", 400);
        return "OK";
    }

    @Post('edit')
    @UseGuards(AuthGuard, PermissionGuard('admin.projects.edit'))
    async editProject(@Body() body: { toEdit: string, updatedFields: Partial<CreateProjectPostDTO> }) {
        let a = await this.projectsService.editByID(body.toEdit, body.updatedFields);
        
        if (!a) throw new HttpException("Failed to edit document!", 400);
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
