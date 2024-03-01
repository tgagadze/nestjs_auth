import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dtos/sing-up.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService){}
  async signUp(SignUpDto:SignUpDto){
    const{email, password}= SignUpDto
    const existingUser = await this.userService.findOne(email);
    if(existingUser){
      throw new BadRequestException('user exzist')
    }

    const hashedPasword = await bcrypt.hash(password, 10);
    await this.userService.create({email,password : hashedPasword})
    return {success : true , message: 'registracione'}


    
    
  


    

  }
    
}

