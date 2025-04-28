import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prismaService: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    try {
      // Crear el libro en la base de datos
      const created = await this.prismaService.book.create({
        data: createBookDto,
      });

      return created;
    } catch (error) {
      // Manejo de errores
      if (error.code === 'P2002') {
        // Código de error de Prisma para violación de unicidad
        throw new BadRequestException(
          'Ya existe un libro con ese título o autor.',
        );
      }
      throw new BadRequestException(
        'Hubo un problema al crear el libro: ' + error.message,
      );
    }
  }

  async findAll() {
    try {
      const allBooks = await this.prismaService.book.findMany();

      if (!allBooks) {
        throw new NotFoundException();
      }

      return allBooks;
    } catch (error) {
      throw new BadRequestException(
        'Hubo un problema al recuperar los libros: ' + error.message,
      );
    }
  }

  async findOne(id: string) {
    try {
      const findBook = await this.prismaService.book.findUnique({
        where: { id },
        include: { author: true },
      });

      if (!findBook) {
        throw new NotFoundException();
      }

      return findBook;
    } catch (error) {
      throw new BadRequestException(
        'Hubo un problema al recuperar el libro con ID: ' + id + error.message,
      );
    }
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      const updatedBook = await this.prismaService.book.update({
        where: { id },
        data: updateBookDto,
      });

      if (!updatedBook) {
        throw new NotFoundException();
      }

      return updatedBook;
    } catch (error) {
      throw new BadRequestException(
        'Hubo un problema al editar el libro con ID: ' + id + error.message,
      );
    }
  }

  async remove(id: string) {
    try {
      const deletedBook = await this.prismaService.book.delete({
        where: { id },
      });

      if (!deletedBook) {
        throw new NotFoundException();
      }

      return deletedBook;
    } catch (error) {
      throw new BadRequestException(
        'Hubo un problema al eliminar el libro con ID: ' + id + error.message,
      );
    }
  }
}
