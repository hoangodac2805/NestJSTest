import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Automatically strips properties that are not defined in the DTO
    forbidNonWhitelisted: false, // Throws an error when non-whitelisted properties are provided
    transform: true, // Automatically transforms payloads to be objects typed according to their DTO classes,
  }));

  await app.listen(3000);
}
bootstrap();
