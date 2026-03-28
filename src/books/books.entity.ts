import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  publishedYear: number;

  @CreateDateColumn()
  createdAt: Date;
}