import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  async create(dto: CreateBookDto) {
    const book = this.bookRepo.create(dto);
    return this.bookRepo.save(book);
  }

  async findAll() {
    return this.bookRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const book = await this.bookRepo.findOne({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async update(id: number, dto: UpdateBookDto) {
    console.log("DTO RECEIVED:", dto);
    const result = await this.bookRepo.update(id, dto);

    if (result.affected === 0) {
      throw new NotFoundException('Book not found');
    }

    return this.bookRepo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const book = await this.findOne(id);

    await this.bookRepo.remove(book);

    return {
      message: 'Book deleted successfully',
    };
  }
}
