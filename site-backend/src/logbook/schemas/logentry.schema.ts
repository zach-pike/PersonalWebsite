import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export interface Coordinates {
  lat: number;
  long: number;
}

export type LogEntryDocument = LogEntry & mongoose.Document;

@Schema()
export class LogEntry {
    @Prop({ required: true })
    band: string;

    @Prop({ required: true })
    callsign: string;

    @Prop({ required: true, type: mongoose.Schema.Types.Mixed })
    location: string | Coordinates

    @Prop({ required: true })
    notes: string;

    @Prop({ required: true })
    time: number;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    poster: string
}

export const LogEntrySchema = SchemaFactory.createForClass(LogEntry);