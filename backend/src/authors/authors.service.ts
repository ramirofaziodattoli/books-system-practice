import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private prismaService: PrismaService) {}

  async create(createAuthorDto: CreateAuthorDto) {
    try {
      const created = await this.prismaService.author.create({
        data: createAuthorDto,
      });

      return created;
    } catch (error) {
      // Manejo de errores
      if (error.code === 'P2002') {
        // Código de error de Prisma para violación de unicidad
        throw new BadRequestException('Ya existe un autor con ese nombre.');
      }
      throw new BadRequestException(
        'Hubo un problema al crear el autor: ' + error.message,
      );
    }
  }

  async findAll() {
    try {
      const allAuthors = await this.prismaService.author.findMany();

      if (!allAuthors) {
        throw new NotFoundException();
      }

      return allAuthors;
    } catch (error) {
      throw new BadRequestException(
        'Hubo un problema al recuperar los autores: ' + error.message,
      );
    }
  }

  async findOne(id: string) {
    try {
      const findAuthor = await this.prismaService.author.findUnique({
        where: { id },
        include: { books: true },
      });

      if (!findAuthor) {
        throw new NotFoundException();
      }

      return findAuthor;
    } catch (error) {
      throw new BadRequestException(
        'Hubo un problema al recuperar el autor con ID: ' + id + error.message,
      );
    }
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    try {
      const updatedAuthor = await this.prismaService.author.update({
        where: { id },
        data: updateAuthorDto,
      });

      if (!updatedAuthor) {
        throw new NotFoundException();
      }

      return updatedAuthor;
    } catch (error) {
      throw new BadRequestException(
        'Hubo un problema al editar el autor con ID: ' + id + error.message,
      );
    }
  }

  async remove(id: string) {
    try {
      const deletedAuthor = await this.prismaService.author.delete({
        where: { id },
      });

      if (!deletedAuthor) {
        throw new NotFoundException();
      }

      return deletedAuthor;
    } catch (error) {
      throw new BadRequestException(
        'Hubo un problema al eliminar el autor con ID: ' + id + error.message,
      );
    }
  }
}
