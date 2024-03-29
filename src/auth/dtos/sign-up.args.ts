import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field({ nullable: true })
  email: string;

  @Field()
  password: string;
}
