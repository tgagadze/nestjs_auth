import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, mongo } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Post extends Document {
  @Field(() => ID)
  _id: mongoose.Schema.Types.ObjectId;

  @Field({ nullable: true })
  @Prop()
  title: string;

  @Field()
  @Prop()
  content: string;

  @Field(() => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: mongoose.Schema.Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
