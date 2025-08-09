import { Body, Controller, Get, HttpException, Post, Request, UseGuards } from '@nestjs/common';
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
}
