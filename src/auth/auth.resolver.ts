
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { signUpInput } from "./dtos/sign-up-args";
import { AuthService } from "./auth.service";
import { SignuptPayload } from "./dtos/sign-up-paiload";
import { SigninPayload } from "./dtos/sign-in-payload";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "./dtos/gql-auth-guard";
import { CurrentUser } from "src/user/current-user-decorator";
import { User } from "src/user/schemas/user.schema";

@Resolver()
export class AuthResolver {
    constructor(private readonly autheService: AuthService) {}
    @UseGuards(GqlAuthGuard)
   @Query(() => User)
   me(@CurrentUser() user : User) {
    this.autheService.getCurrentUser(user.email)

   }
  
    @Mutation(() => SignuptPayload)
    signup(@Args('signup') signUpInput: signUpInput):Promise  <SignuptPayload>{
        return this.autheService.signUp(signUpInput)

    }
    @Mutation(() => SigninPayload)
    signIn(@Args('signIn') signinInput: signUpInput):Promise <SigninPayload>{
        return this.autheService.signUp(signinInput)

    }


}