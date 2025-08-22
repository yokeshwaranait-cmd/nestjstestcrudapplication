// src/seed.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './users/schemas/role.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const roleModel = app.get<Model<Role>>(getModelToken(Role.name));

  await roleModel.create([{ name: 'admin' }, { name: 'user' }]);

  console.log('Roles seeded successfully!');
  await app.close();
}

bootstrap();
