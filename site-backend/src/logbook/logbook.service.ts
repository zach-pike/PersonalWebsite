import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { LogEntryDTO } from './dto/logentry.dto';
import { InjectModel } from '@nestjs/mongoose';
import { LogEntry, LogEntryDocument } from './schemas/logentry.schema';

@Injectable()
export class LogbookService {
    constructor(@InjectModel(LogEntry.name) private readonly logEntryModel: Model<LogEntryDocument>) {}

    async createNewPost(user: string, info: LogEntryDTO) {
        let le: LogEntry = {
            ...info,
            time: Date.now(),
            poster: user
        };

        let a = new this.logEntryModel(le);
        
        try {
            await a.save();
            return true;
        } catch(e) {
            return false;
        }
    }

    async loadPosts() {
        return await this.logEntryModel.find({}).exec();
    }
}
