import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


@ObjectType()
@Schema()
export class User extends Document {
  @Field()
  @Prop({ unique: true })
  email: string;
 
@Prop({ select: false })
  password: string;
  @Field(() => ID)
  _id?: mongoose.Schema.Types.ObjectId;

 @Field()
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }])
  posts: mongoose.Schema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
