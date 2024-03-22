import { Field, InputType, } from "@nestjs/graphql";


@InputType()
export class signUpInput {
    @Field()
    email: string;
    
    @Field()
    password: string;
}