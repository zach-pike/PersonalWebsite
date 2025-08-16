import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

@Schema()
export class FileStorage {
    @Prop({ required: true })
    originalFileName: string;

    @Prop({ required: true })
    fileUUID: string;

    @Prop({ required: true })
    size: number;

    @Prop({ required: true })
    uploaded: number;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    owner: string;
}

export type FileStorageDocument = FileStorage & Document;
export const FileStorageSchema = SchemaFactory.createForClass(FileStorage);