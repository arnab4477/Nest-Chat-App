import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserAuthDto } from 'src/dto';
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

    // Check if any user already exists with this name
    const existingUser = await this.userRepository.findOne({
      where: { name },
    });

    if (existingUser) {
      console.log('duplicate error');
      throw new HttpException('name already taken', HttpStatus.BAD_REQUEST);
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create and save the new user to the table
    const newUser = this.userRepository.create({ name, passwordHash });
    const savedUser = await this.userRepository.save(newUser);

    // Return the new users name and id after registration
    return { name: savedUser.name, id: savedUser.id };
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

    return { name: existingUser.name, id: existingUser.id };
  }
}
