import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SignUpInput } from './dtos/sign-up.args';
import { AuthService } from './auth.service';
import { SignUpPayload } from './dtos/sign-up-payload.dto';
import { SignInPayload } from './dtos/sign-in-payload';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { CurrentUser } from 'src/user/current-user.decorator';
import { User } from 'src/user/schemas/user.schema';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  me(@CurrentUser() user: User) {
    return this.authService.getCurrentUser(user.email);
  }

  @Mutation(() => SignUpPayload)
  signUp(@Args('signUp') signUpInput: SignUpInput): Promise<SignUpPayload> {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => SignInPayload)
  signIn(@Args('signIn') signInInput: SignUpInput): Promise<SignInPayload> {
    return this.authService.signIn(signInInput);
  }
}
