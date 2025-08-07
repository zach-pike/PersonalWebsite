import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserRole } from './roles';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    async findUserByUsername(username: string) : Promise<null | UserDocument> {
        let res = await this.userModel.findOne({ username }).exec();
        return res;
    }

    async createNewUser(username: string, displayName: string, password: string) {
        let passwordHash = await bcrypt.hash(password, 10); 

        let a = new this.userModel({
            username: username,
            displayName: displayName,
            hash: passwordHash,

            created: Date.now(),
            roles: [UserRole.Default],
        });

        await a.save();

        return true;
    }

    async authorizeUser(user: User, password: string) {
        return bcrypt.compare(password, user.hash);
    }
}
