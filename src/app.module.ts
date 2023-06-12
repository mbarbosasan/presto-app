import { Module } from '@nestjs/common';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ReviewsModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
