import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [BooksModule, AuthorsModule],
  providers: [PrismaService],
})
export class AppModule {}
