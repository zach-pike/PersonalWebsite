import { Controller, Get } from '@nestjs/common';

@Controller('blog')
export class BlogController {
    @Get('recent')
    async getRecent() {
        return [
            {
                title: "blogone",
                time: Date.now(),
                content: "hello world"
            },
            {
                title: "blogtwo",
                time: Date.now() - (24*60*60*1000),
                content: "hello world"
            },
            {
                title: "blogthree",
                time: Date.now() - 2 * (24*60*60*1000),
                content: "hello world"
            }
        ]
    }
}
