
// main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // only allow DTO fields
      forbidNonWhitelisted: false, //  don't throw error if extra props exist
      transform: true,             //  converts types (string → number, etc.)
    }),
  );

  await app.listen(3000);
}
bootstrap();
