import { Module } from '@nestjs/common';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import {ImageController} from "./image.controller";
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ReviewsModule,
    AuthModule,
    UsersModule,
    ConfigModule,
    CloudinaryModule
  ],
  controllers: [ImageController],
  providers: [],
  exports: [],
})
export class AppModule {}
