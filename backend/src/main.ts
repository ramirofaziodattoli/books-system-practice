import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Esto transforma el objeto de entrada a la clase DTO
      whitelist: true, // Esto elimina propiedades no definidas en el DTO
    }),
  );
  app.enableCors();

  await app.listen(4000);
}
bootstrap();
