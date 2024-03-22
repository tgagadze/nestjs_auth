import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dtos/sing-up.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dtos/sign-in-dto';
import { SignuptPayload } from './dtos/sign-up-paiload';
import { signUpInput } from './dtos/sign-up-args';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(signUpDto: SignUpDto| signUpInput) : Promise <SignuptPayload> {
    const { email, password } = signUpDto;
    const existingUser = await this.userService.findByEmail;
    if(existingUser){
      throw new BadRequestException('user exzist')
    }

    const hashedPasword = await bcrypt.hash(password, 10);

    await this.userService.create({ email, password: hashedPasword });
    return { success: true, message: 'Register successful' };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const arePasswordsEqual = await bcrypt.compare(password, user.password);

    if (!arePasswordsEqual) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwtPayload = {
      email,
      _id: user.id,
    };

    const access_token = await this.jwtService.sign(jwtPayload);

    return { access_token };
  }
}
