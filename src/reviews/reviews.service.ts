import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/PrismaService';
import { Prisma, Review } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ReviewsService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async getReviews() {
    return this.prisma.review.findMany();
  }

  createReview(review: Review, file: Express.Multer.File) {
    try {
      this.prisma.$transaction(async (prisma) => {
        await this.cloudinary.uploadImage(file).then(async (response) => {
          const newReview = this.transformReviewIdToNumber(review);
          review.product_image = response.secure_url;
          await prisma.review.create({
            data: newReview,
          });
        });
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaClientKnownRequestError(error.message, {
          meta: error.meta,
          clientVersion: error.clientVersion,
          code: error.code,
        });
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  private transformReviewIdToNumber(review: Review): Review {
    review.userId = Number(review.userId);
    review.categoryId = Number(review.categoryId);
    review.rating_price = Number(review.rating_price);
    review.rating_cxb = Number(review.rating_cxb);
    review.rating_quality = Number(review.rating_quality);
    review.rating_overall = Number(review.rating_overall);
    review.product_price = Number(review.product_price);
    return review;
  }
}
