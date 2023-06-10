import {Controller, Get, Post} from '@nestjs/common';
import {Review} from "@prisma/client";
import {ReviewsService} from "./reviews.service";

@Controller('reviews')
export class ReviewsController {

    constructor(private reviewService: ReviewsService) {}
    @Get()
    getReviews(): Promise<Review[]> {
        return this.reviewService.getReviews();
    }

    @Post()
    createReview(): void {
        this.reviewService.createReview();
    }
}
