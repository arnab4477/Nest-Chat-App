import {
  Controller,
  Post,
  Body,
  Request,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDto } from 'src/dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async registerUser(@Body() userDetails: UserAuthDto) {
    return await this.authService.createUser(userDetails);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async authenticateUser(@Request() req) {
    return req.user;
  }
}
