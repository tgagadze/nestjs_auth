import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class User extends Document {
  @Field((type) => ID)
  _id?: mongoose.Schema.Types.ObjectId;

  @Field({
    nullable: true,
    description: 'This is email field',
    deprecationReason: 'Depricated',
  })
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }])
  posts: mongoose.Schema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
