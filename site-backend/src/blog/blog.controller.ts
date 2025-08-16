import { Body, Controller, Get, HttpException, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtUser } from 'src/auth/interfaces/jwtuser.interface';
import { PermissionGuard } from 'src/auth/permission.guard';
import { CreateBlogPostDTO } from './dto/createblogpost.dto';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Get('recent')
    async getRecent() {
        return this.blogService.getRecentPosts();
    }

    @Post('new')
    @UseGuards(AuthGuard, PermissionGuard('admin.blog.post'))
    async createBlogPost(@Request() { user }: { user: JwtUser}, @Body() data: CreateBlogPostDTO) {
        let res = await this.blogService.createNewPost(user._id, data);

        if (!res) throw new HttpException("Could not save to DB!", 500);
        return "OK";
    }

    @Get('get')
    async listPaginationEndpoint(
        @Query('start') start: number | null,
        @Query('end') end : number | null,
        @Query('info') info: string | null
    ) {
        if (start && end) {
            return await this.blogService.getPagedItems(start, end);
        } else if (info) {
            switch(info) {
                case "totalItems": {
                    return await this.blogService.getTotalItems();
                };
            }
        } else {
            throw new HttpException("Unknown request type", 400);
        }
    }
}
