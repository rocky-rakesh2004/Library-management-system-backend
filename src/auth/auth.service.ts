import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
  const userExists = await this.usersService.findByEmail(
    dto.email,
  );

  if (userExists) {
    throw new BadRequestException(
      'User already exists',
    );
  }

  const user = await this.usersService.createUser(
    dto.name,
    dto.email,
    dto.password,
  );

  return {
    message: 'User registered successfully',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  };
}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      tokenVersion: user.tokenVersion,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async logoutAll(userId: number) {
    await this.usersService.updateTokenVersion(userId);

    return {
      message: 'Logged out from all devices',
    };
  }

  logout() {
    return {
      message: 'Logged out successfully',
    };
  }
}
