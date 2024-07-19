import { IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class userLoginDto {
  @ApiProperty({
    example: 'Abc',
    description: 'User name',
  })
  @IsString()
  userName: string;

  @ApiProperty({
    example: 'Abc',
    description: 'Password',
  })
  @IsString()
  password: string;
}
