import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from './books.entity';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AdminBooksController } from './admin-books.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [
    BooksController,
    AdminBooksController,
  ],
  providers: [BooksService],
})
export class BooksModule {}