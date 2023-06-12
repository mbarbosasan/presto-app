import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/PrismaService';

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
    return this.prismaService.user.create({
      data: user,
    });
  }
}
