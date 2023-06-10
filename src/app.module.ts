import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReviewsModule } from './reviews/reviews.module';
import {PrismaService} from "./prisma/PrismaService";

@Module({
  imports: [ReviewsModule],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {}
