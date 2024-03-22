import { Field, ObjectType } from "@nestjs/graphql";
@ObjectType()
export class SignuptPayload {
    @Field()
    succes : boolean;
    @Field()
    message : string;
}