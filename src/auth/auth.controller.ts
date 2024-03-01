import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/sing-up.dto';
import { SignInDto } from './dtos/sign-in-dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  singUp(@Body() SignUpDto: SignUpDto ){
    return this.authService.signUp(SignUpDto);
  }
  @Post()
  singIn(@Body() signInDto: SignInDto ){
    return this.authService.signUp(signInDto);
  }
  


  
}
