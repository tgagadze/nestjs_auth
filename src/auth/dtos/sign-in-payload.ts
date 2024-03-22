import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SigninPayload{
    @Field()
access_token: string;


}