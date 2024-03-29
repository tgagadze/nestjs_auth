import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SignInPayload {
  @Field()
  access_token: string;
}
