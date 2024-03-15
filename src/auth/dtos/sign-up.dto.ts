import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignUpDto {
  @ApiProperty({example : 'veshapidzetornike@gmail.com'})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '12345678'})
  @IsNotEmpty()
  @Length(8)
  password: string;
}
