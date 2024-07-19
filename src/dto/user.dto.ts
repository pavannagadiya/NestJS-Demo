import { IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDetailsDto {
  id: number;
  userName: string;
  address?: string | null;
  access_token?: string;
}

export class userDto {
  @ApiProperty({
    example: 'Abc',
    description: 'User name',
  })
  @IsString()
  userName: string;

  @ApiProperty({
    example: 'Abc',
    description: 'User name',
  })
  @IsOptional()
  @IsString()
  address: string;
}

export class createUserDto {
  @ApiProperty({
    example: 'Abc',
    description: 'User name',
  })
  @IsString()
  userName: string;

  @ApiProperty({
    example: 'password',
    description: 'User Password',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'Abc',
    description: 'User name',
  })
  @IsOptional()
  @IsString()
  address: string;
}
