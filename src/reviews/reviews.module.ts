import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import {PrismaService} from "../prisma/PrismaService";
import {CloudinaryService} from "../cloudinary/cloudinary.service";

@Module({
  imports: [],
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService, CloudinaryService]
})
export class ReviewsModule {}
