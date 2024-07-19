import {
  Body,
  Controller,
  HttpException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from 'src/entities/user.entity';
import { userLoginDto } from 'src/dto/auth.dto';
import { UserDetailsDto } from 'src/dto/user.dto';
import { RefreshJwtGuard } from './guard/refresh-jwt-auth.guard';
import { RefreshTokenDto } from 'src/dto/refresh-token.dto';

@ApiTags('Auth Controller')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  /**
   * User login.
   * @param {userLoginDto} userLoginDto - Data Transfer Object for user creation.
   * @returns {Promise<UserDetailsDto>} - Data Transfer Object for user details.
   */
  @ApiOperation({ summary: 'User login' })
  @Post('login-user')
  async login(@Body() userLoginDto: userLoginDto): Promise<UserDetailsDto> {
    return await this.authService.login(
      userLoginDto.userName,
      userLoginDto.password,
    );
  }
}
