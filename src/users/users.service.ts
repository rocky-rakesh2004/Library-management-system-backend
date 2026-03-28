import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { User } from './users.entity';
import { Role } from './role.enum';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.createDefaultAdmin();
  }

  async createDefaultAdmin() {
    const adminEmail = 'admin@library.com';

    const adminExists = await this.userRepo.findOne({
      where: { email: adminEmail },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      const admin = this.userRepo.create({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: Role.ADMIN,
      });

      await this.userRepo.save(admin);

      console.log('Default Admin Created');
      console.log('Email: admin@library.com');
      console.log('Password: admin123');
    }
  }

  async createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      name,
      email,
      password: hashedPassword,
      role: Role.USER,
    });

    return this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  async findById(id: number) {
    return this.userRepo.findOne({
      where: { id },
    });
  }

  async findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    return this.userRepo.findOne({
      where: { id },
    });
  }

  async remove(id: number, adminId: number) {
    if (id === adminId) {
      throw new BadRequestException('Admin cannot delete himself');
    }

    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepo.remove(user);

    return {
      message: 'User deleted successfully',
    };
  }

  async updateTokenVersion(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.tokenVersion += 1;
    return this.userRepo.save(user);
  }
}
