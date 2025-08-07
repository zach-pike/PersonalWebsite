import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class LogEntry {
    @Prop({ required: true })
    band: string;

    @Prop({ required: true })
    frequency: number;

    @Prop({ required: true })
    mode: string;

    @Prop({ required: true })
    quality: number;

    @Prop({ required: true })
    strength: string;

    @Prop({ required: true })
    callsign: string;

    @Prop({ required: true })
    location: string;
    
    @Prop({ required: true })
    notes: string;
    
    @Prop({ required: true })
    time: number;
    
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    poster: string
}
  
export type LogEntryDocument = LogEntry & mongoose.Document;
export const LogEntrySchema = SchemaFactory.createForClass(LogEntry);