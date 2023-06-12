import {Injectable, InternalServerErrorException} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/PrismaService';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async createUser(user: User) {
    user.password = await this.hashPassword(user.password);
    if (user.password) {
      return this.prismaService.user.create({
        data: user,
      });
    } else {
      throw new InternalServerErrorException("Error creating user")
    }
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10).then((hash) => {
      return hash;
    }, (err) => {
      console.log(err);
      return null;
    })
  }
}
