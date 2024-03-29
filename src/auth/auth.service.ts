import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpInput } from './dtos/sign-up.args';
import { SignUpPayload } from './dtos/sign-up-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto | SignUpInput): Promise<SignUpPayload> {
    const { email, password } = signUpDto;
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPasword = await bcrypt.hash(password, 10);

    await this.userService.create({ email, password: hashedPasword });
    return { success: true, message: 'Register successful' };
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userService.findByEmail(email);
    console.log('user', user);
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

  getCurrentUser(email: string) {
    return this.userService.findByEmail(email);
  }
}
