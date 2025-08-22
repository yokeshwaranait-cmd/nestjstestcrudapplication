// main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = (configService.get('PORT') as number) || 3000;
  await app.listen(port);
  console.log(`App running on port ${port} in ${process.env.NODE_ENV} mode`);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // only allow DTO fields
      forbidNonWhitelisted: false, //  don't throw error if extra props exist
      transform: true, //  converts types (string → number, etc.)
    }),
  );
}
bootstrap();
