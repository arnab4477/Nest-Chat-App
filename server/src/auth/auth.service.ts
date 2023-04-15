import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserAuthDto } from './dto/UserAuth';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: UserAuthDto) {
    const { name, password } = user;

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create and save the new user to the table
    const newUser = this.userRepository.create({ name, passwordHash });
    const savedUser = await this.userRepository.save(newUser);

    // Return the new users name and id after registration
    return { user: { name: savedUser.name, id: savedUser.id } };
  }

  async authenticateUser(user: UserAuthDto) {
    const { name, password } = user;
    const existingUser = await this.userRepository.findOne({
      where: { name },
    });

    // Check if an user exists with the provided username
    if (!existingUser) {
      return null;
    }

    // Check if the provided password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash,
    );
    if (!isPasswordCorrect) {
      return null;
    }

    return { user: { name: existingUser.name } };
  }
}
