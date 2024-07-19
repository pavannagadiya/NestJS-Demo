import { ApiProperty } from '@nestjs/swagger';
import { IsString } from '@nestjs/class-validator';
export class RefreshTokenDto {
  @ApiProperty({
    example: 'Refresh',
    description: 'Refresh token',
  })
  @IsString()
  refresh: string;
}
