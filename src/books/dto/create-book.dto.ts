import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    example: 'Atomic Habits',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'James Clear',
  })
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    example: 'Self improvement book',
  })
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 2018,
  })
  @IsNumber()
  publishedYear: number;
}