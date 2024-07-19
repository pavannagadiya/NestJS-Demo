import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { createUserDto, userDto } from './dto/user.dto';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Retrieve all users.
   * @returns {Promise<User[]>} List of users.
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * Retrieve a single user by ID.
   * @param {number} id - User ID.
   * @returns {Promise<User>} The requested user.
   * @throws {NotFoundException} If user with specified ID is not found.
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id: id,
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Create a new user.
   * @param userDto - Data Transfer Object of user.
   * @returns {Promise<User>} The created user.
   */
  async createUser(userData: createUserDto): Promise<User> {
    const newPassword = await this.generatePassword(userData.password);
    return this.userRepository.save({
      name: userData.userName,
      address: userData?.address,
      password: newPassword,
    });
  }

  /**
   * Update a user by ID.
   * @param {number} id - User ID.
   * @param {userDto} userData - The new username for the user.
   * @returns {Promise<User>} The updated user.
   */
  async updateUser(id: number, userData: userDto): Promise<User> {
    const user = await this.findOne(id);
    user.name = userData.userName;
    user.address = userData.address;
    return await this.userRepository.save(user);
  }

  /**
   * Delete a user by ID.
   * @param {number} id - User ID.
   * @returns {Promise<void>}
   * @throws {NotFoundException} If user with specified ID is not found.
   */
  async deleteUser(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async generatePassword(password) {
    try {
      const salt = await genSalt(10);
      const bcryptPass = await hash(password, salt);
      return bcryptPass;
    } catch (error) {
      console.log('error: ', error);
      return false;
    }
  }
}
