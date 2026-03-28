import {
  Controller,
  Get,
  Put,
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

@ApiTags('Books (Admin)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin/books')
export class AdminBooksController {
  constructor(private readonly booksService: BooksService) {}

  // ADMIN → CREATE BOOK
  @Post()
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  // ADMIN → GET ALL BOOKS
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  // ADMIN → GET BOOK BY ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  // ADMIN → UPDATE BOOK
  // PATCH (partial)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) {
    return this.booksService.update(id, dto);
  }

  // PUT (full)
  @Put(':id')
  updateFull(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBookDto,
  ) {
    return this.booksService.update(id, dto);
  }

  // ADMIN → DELETE BOOK
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.remove(id);
  }
}
