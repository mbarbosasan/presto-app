import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/PrismaService';
import {Prisma, Review} from '@prisma/client';
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async getReviews() {
    return this.prisma.review.findMany();
  }

  async createReview(review: Review) {
    await this.prisma.review
      .create({
        data: review,
      })
      .catch((error) => {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
              throw new PrismaClientKnownRequestError(error.message, {
                    meta: error.meta,
                    clientVersion: error.clientVersion,
                    code: error.code,
              } )
          } else {
              throw new InternalServerErrorException(error.message)
          }
      });
  }
}
