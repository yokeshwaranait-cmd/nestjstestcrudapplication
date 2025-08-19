import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, Role } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { MESSAGES } from '../common/constants/messages';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const exists = await this.userModel.findOne({ email: dto.email }).lean();
      if (exists) throw new ConflictException(MESSAGES.USER.EMAIL_IN_USE);

      const hash = await bcrypt.hash(dto.password, 10);
      const user = new this.userModel({
        ...dto,
        password: hash,
        roles: dto.roles ?? [Role.USER],
      });

      return await user.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message || MESSAGES.GENERAL.INTERNAL_ERROR);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({ email }).select('+password');
    } catch (error) {
      throw new InternalServerErrorException(error.message || MESSAGES.GENERAL.INTERNAL_ERROR);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message || MESSAGES.GENERAL.INTERNAL_ERROR);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) throw new NotFoundException(MESSAGES.USER.NOT_FOUND);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message || MESSAGES.GENERAL.INTERNAL_ERROR);
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).select('-password');
      if (!user) throw new NotFoundException(MESSAGES.USER.NOT_FOUND);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message || MESSAGES.GENERAL.INTERNAL_ERROR);
    }
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    try {
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }
      const updated = await this.userModel
        .findByIdAndUpdate(id, updateData, { new: true })
        .select('-password');
      if (!updated) throw new NotFoundException(MESSAGES.USER.NOT_FOUND);
      return updated;
    } catch (error) {
      throw new InternalServerErrorException(error.message || MESSAGES.GENERAL.INTERNAL_ERROR);
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const result = await this.userModel.findByIdAndDelete(id);
      if (!result) throw new NotFoundException(MESSAGES.USER.NOT_FOUND);
      return { message: MESSAGES.USER.DELETED };
    } catch (error) {
      throw new InternalServerErrorException(error.message || MESSAGES.GENERAL.INTERNAL_ERROR);
    }
  }
}
