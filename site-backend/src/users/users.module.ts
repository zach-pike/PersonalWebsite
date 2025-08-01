import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './providers/user.provider';

@Module({
    imports: [DatabaseModule],
    providers: [UsersService, ...userProviders],
    exports: [UsersService, ...userProviders]
})
export class UsersModule {}
