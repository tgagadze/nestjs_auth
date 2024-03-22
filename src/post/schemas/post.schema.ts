import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';


@ObjectType()
@Schema()
export class Post extends Document {
  @Field(() =>ID)
  _id?: mongoose.Schema.Types.ObjectId;
  @Field()
  @Prop()
  title: string;
@Field()
  @Prop()
  content: string;
  @Field(()=> User)

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: mongoose.Schema.Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
