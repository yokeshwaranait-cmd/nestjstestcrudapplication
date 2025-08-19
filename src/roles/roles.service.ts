// src/roles/roles.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../users/schemas/role.schema';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name, 'usersConnection') private roleModel: Model<Role>) {}

  async findAll(): Promise<Role[]> {
    return this.roleModel.find();
  }
}
