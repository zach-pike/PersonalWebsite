import { Inject, Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { UserRole } from './roles';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) {}

    async findUserByUsername(username: string) : Promise<null | User> {
        let res = await this.userModel.findOne({ username }).exec();
        return res;
    }

    async createNewUser(username, displayName, password) {
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
