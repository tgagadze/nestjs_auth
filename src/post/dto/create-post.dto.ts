import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';



InputType()
export class CreatePostDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;
@Field()
  @IsString()
  @IsNotEmpty()
  content: string;

  
}
