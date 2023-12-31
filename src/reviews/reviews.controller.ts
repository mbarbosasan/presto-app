import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Prisma, Review } from '@prisma/client';
import { ReviewsService } from './reviews.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Get()
  async getReviews(): Promise<Review[]> {
    return this.reviewService.getReviews();
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createReview(
    @Body() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const review: Review = JSON.parse(req.review);
      await this.reviewService.createReview(review, file);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(e, HttpStatus.BAD_REQUEST, {
          cause: new Error(e.message),
        });
      } else {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR, {
          cause: new Error('Error creating review'),
        });
      }
    }
  }
}
