// src/roles/roles.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from '../users/schemas/role.schema';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';


@Module({
  imports: [MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }])],
  providers: [RolesService],
  controllers: [RolesController],  
  exports: [MongooseModule], //  so other modules (or seed) can use it
})
export class RolesModule {}
