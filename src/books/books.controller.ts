import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

import { BooksService } from './books.service';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorators';

import { Role } from '../users/role.enum';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Books (User)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // USER → VIEW ALL BOOKS
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  // USER → VIEW BOOK BY ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }
}