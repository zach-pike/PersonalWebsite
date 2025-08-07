import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../roles';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true })
  hash: string;

  @Prop({ required: true, type: [String] })
  roles: UserRole[]

  @Prop({ required: true })
  created: number;
}

export const UserSchema = SchemaFactory.createForClass(User);