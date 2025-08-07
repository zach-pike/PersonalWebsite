import { Module } from '@nestjs/common';
import { LogbookController } from './logbook.controller';
import { LogbookService } from './logbook.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LogEntry, LogEntrySchema } from './schemas/logentry.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: LogEntry.name, schema: LogEntrySchema }]),
        AuthModule, 
        UsersModule
    ],
    controllers: [LogbookController],
    providers: [LogbookService, AuthService]
})
export class LogbookModule {}
