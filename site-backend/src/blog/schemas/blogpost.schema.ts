import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class BlogPost {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    time: number;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    poster: string;
}

export type BlogPostDocument = BlogPost & Document;
export const BlogPostSchema = SchemaFactory.createForClass(BlogPost);