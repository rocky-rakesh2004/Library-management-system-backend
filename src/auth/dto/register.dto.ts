import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'Rakesh',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'user@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
  })
  @MinLength(6)
  password: string;
}