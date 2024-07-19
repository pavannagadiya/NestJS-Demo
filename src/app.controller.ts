import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { createUserDto, userDto } from './dto/user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

@ApiTags('Users Controller')
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Retrieve all users.
   * @returns {Promise<User[]>} List of users.
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async findAll(@Request() req): Promise<User[]> {
    return await this.appService.findAll();
  }

  /**
   * Create a new user.
   * @param {createUserDto} createUserDto - Data Transfer Object for user creation.
   * @returns {Promise<User>} The created user.
   */
  @ApiOperation({ summary: 'Create new user' })
  @Post('create-user')
  async createUser(@Body() createUserDto: createUserDto): Promise<User> {
    return await this.appService.createUser(createUserDto);
  }

  /**
   * Retrieve a single user by ID.
   * @param {number} id - User ID.
   * @returns {Promise<User>} The requested user.
   */
  @ApiOperation({ summary: 'Get single user by id' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @Get('get-single-user/:id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.appService.findOne(id);
  }

  /**
   * Update a user by ID.
   * @param {number} id - User ID.
   * @param {userDto} updateUserDto - Data Transfer Object for user update.
   * @returns {Promise<User>} The updated user.
   */
  @ApiOperation({ summary: 'Update single user by id' })
  @Put('update-user/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: userDto,
  ): Promise<User> {
    return await this.appService.updateUser(id, updateUserDto);
  }

  /**
   * Delete a user by ID.
   * @param {string} id - User ID.
   * @returns {Promise<void>}
   */
  @ApiOperation({ summary: 'Delete single user by id' })
  @Delete('delete-user/:id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.appService.deleteUser(+id);
  }
}
