import { Injectable } from '@nestjs/common';
import { Project, ProjectDocument } from './schemas/project.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProjectPostDTO } from './dto/createprojectpost.dto';

@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>) {}

    async byId(id: string): Promise<Project | null> {
        return await this.projectModel.findById(id).exec();
    }

    async newProjectPost(user: string, data: CreateProjectPostDTO) {
        let post = new this.projectModel({ ...data, poster: user, time: Date.now() });

        try {
            await post.save();

            return true;
        } catch(e) {
            return false;
        }
    }

    async getTotalItems(): Promise<number> {
        return this.projectModel.countDocuments({}).exec();
    }

    async getPagedItems(start: number, end: number): Promise<Project[]> {
        let items = await this.projectModel
            .find({})
            .sort({ time: -1 })
            .skip(start)
            .limit(end - start)
            .exec();

        return items;
    }

    async deleteByID(id: string) {
        try {
            await this.projectModel.findById(id).deleteOne().exec();
            return true;
        } catch(e) {
            return false;
        }
    }

    async editByID(id: string, data: Partial<CreateProjectPostDTO>) {
        try {
            await this.projectModel.findByIdAndUpdate(id, data).exec();
            return true;
        } catch(e) {
            return false;
        }
    }
}
