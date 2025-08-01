import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: String,
    displayName: String,
    hash: String,
    created: Number,
    roles: Array<String>
});