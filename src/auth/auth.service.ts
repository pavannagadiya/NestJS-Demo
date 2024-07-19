import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { UserDetailsDto } from 'src/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Login user.
   * * @returns {Promise<UserDetailsDto>} The created user.
   */
  async login(userName: string, password: string): Promise<UserDetailsDto> {
    const isUserExist = await this.userRepository.findOneBy({ name: userName });
    if (!isUserExist) {
      throw new NotFoundException(`Please check credentials.`);
    }
    const comparePassword = await compare(password, isUserExist.password);
    if (!comparePassword) {
      throw new NotFoundException(`Please check credentials.`);
    }
    const userDto: UserDetailsDto = {
      id: isUserExist.id,
      userName: isUserExist.name,
      address: isUserExist.address,
    };
    const payload = { userName: userDto.userName, id: userDto.id };
    return {
      ...userDto,
      access_token: this.jwtService.sign(payload),
    };
  }
}
