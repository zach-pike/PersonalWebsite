import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [BlogController],
    providers: [BlogService, AuthService]
})
export class BlogModule {}
