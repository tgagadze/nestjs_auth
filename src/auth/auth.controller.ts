import { Body, Controller, Post, Req, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
@ApiCreatedResponse({schema : {example: {
  success:true,  message: 'registracion'
}}})
  @ApiBadRequestResponse({
    schema : { example : {
      message: 'user already exists', status : HttpStatus.BAD_REQUEST
    }}
  })
  @ApiOkResponse({schema: {
    example: {access_token : 'ajksfhkjahfaksjfhsakjhfbaskjhfskjahfajkhkahj'}
  }})
  @Post('/sign-up')
  singUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
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
