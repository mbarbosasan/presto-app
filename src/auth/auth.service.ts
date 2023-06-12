import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (user.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(user: User) {
    const userExists = await this.usersService.findOne(user.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const newUser = await this.usersService.createUser(user);

    return {
      access_token: await this.jwtService.signAsync({
        sub: newUser.id,
        username: newUser.email,
      }),
    };
  }
}
