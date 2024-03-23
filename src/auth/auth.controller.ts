import { Body, Controller, Post, Req, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({schema: {example: { success: true, message: 'Register successful' }}})
  @ApiBadRequestResponse({schema: {example: {message: 'User already exists', status: 400 }}})
  @Post('/sign-up')
  singUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
  @ApiCreatedResponse({schema: {example: {access_token: '<KEY>'}}})
  @ApiBadRequestResponse({schema: {example: {message: 'User already exists', status: 400 }}})
  @Post('/sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/current-user')
  getCurrentUser(@Req() req) {
    return this.authService.getCurrentUser(req.user.email);
  }
}
