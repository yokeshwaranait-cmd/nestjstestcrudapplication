import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { MESSAGES } from '../common/constants/messages';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  async register(dto: CreateUserDto) {
    try {
      return await this.users.create(dto);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : MESSAGES.GENERAL.INTERNAL_ERROR;
      throw new InternalServerErrorException(message);
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await this.users.findByEmail(email);
      if (!user)
        throw new UnauthorizedException(MESSAGES.AUTH.INVALID_CREDENTIALS);

      if (!user.password)
        throw new UnauthorizedException(MESSAGES.AUTH.PASSWORD_MISSING);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        throw new UnauthorizedException(MESSAGES.AUTH.INVALID_CREDENTIALS);

      const payload = { sub: user._id, email: user.email, roles: user.roles };
      return {
        access_token: this.jwt.sign(payload),
        message: MESSAGES.AUTH.LOGIN_SUCCESS,
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : MESSAGES.GENERAL.INTERNAL_ERROR;
      throw new InternalServerErrorException(message);
    }
  }
}
