import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
    imports: [DatabaseModule, UsersModule],
    providers: [AuthService, UsersService],
    controllers: [AuthController]
})
export class AuthModule {}
