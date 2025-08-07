import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { BlogPost, BlogPostSchema } from './schemas/blogpost.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        MongooseModule.forFeature([{ name: BlogPost.name, schema: BlogPostSchema }])
    ],
    controllers: [BlogController],
    providers: [BlogService, AuthService]
})
export class BlogModule {}
