import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: "genadi@genadula.com", description: "User email", required: true, type: String, format: "email" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "123123123", description: "User password", required: true, type: String, format: "password", minLength: 8 })
  @IsNotEmpty()
  @Length(8)
  password: string;
}
