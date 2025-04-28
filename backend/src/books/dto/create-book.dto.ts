import { IsString, IsOptional, IsDate } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  authorId: string;
}
