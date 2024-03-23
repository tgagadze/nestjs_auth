import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreatePostDto {
  @ApiProperty({example: "Title", description: "Post title", required: true, type: String})
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({example: "Content", description: "Post content", required: true, type: String})
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({example: "<MONGO_Id>", description: "Post Id", type: mongoose.Schema.Types.ObjectId, format: "mongoId"})
  @IsMongoId()
  user: mongoose.Schema.Types.ObjectId;
}
