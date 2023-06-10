import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import {PrismaService} from "../prisma/PrismaService";
import {AppModule} from "../app.module";

@Module({
  imports: [],
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService]
})
export class ReviewsModule {}
