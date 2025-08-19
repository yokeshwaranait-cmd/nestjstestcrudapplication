import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async register(dto: CreateUserDto) {
    return this.users.create(dto);
  }

async login(email: string, password: string) {
  const user = await this.users.findByEmail(email);
  if (!user) {
    throw new UnauthorizedException('Invalid credentials (no user)');
  }

 

  // Check if password or user.password is missing
  if (!password || !user.password) {
    throw new UnauthorizedException('Password is missing');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedException('Invalid credentials (wrong password)');
  }

  const payload = { sub: user._id, email: user.email, roles: user.roles };
  return { access_token: this.jwt.sign(payload) };
}


}
