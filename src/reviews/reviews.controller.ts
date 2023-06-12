import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {Prisma, Review} from '@prisma/client';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}
  @Get()
  async getReviews(): Promise<Review[]> {
    return this.reviewService.getReviews();
  }

  @Post('create')
  async createReview(@Body() review: Review) {
      try {
        await this.reviewService.createReview(review)
      } catch (e) {
          if (e instanceof Prisma.PrismaClientKnownRequestError) {
              throw new HttpException(e, HttpStatus.BAD_REQUEST, {
                    cause: new Error(e.message),
              })
          } else {
              throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR, {
                  cause: new Error('Error creating review'),
              })
          }
      }
  }
}
