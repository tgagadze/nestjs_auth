import { IsNotEmpty, IsString } from 'class-validator';

import { InputType, Field } from '@nestjs/graphql';

@InputType()
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
