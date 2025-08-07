import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BlogPost, BlogPostDocument } from './schemas/blogpost.schema';
import { Model } from 'mongoose';
import { CreateBlogPostDTO } from './dto/createblogpost.dto';

@Injectable()
export class BlogService {
    constructor(@InjectModel(BlogPost.name) private readonly blogPostModel: Model<BlogPostDocument>) {}

    async createNewPost(poster: string, data: CreateBlogPostDTO) {
        let docData: BlogPost = {
            ...data,
            time: Date.now(),
            poster
        };

        let doc = new this.blogPostModel(docData);

        try {
            await doc.save();
            return true;
        } catch(e) {
            return false;
        }
    }

    async getRecentPosts(): Promise<BlogPost[]> {
        let recent = await this.blogPostModel.find({}).sort({ time: -1 }).exec();
        return recent;
    }
}
