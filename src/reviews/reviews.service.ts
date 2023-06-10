import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/PrismaService";

@Injectable()
export class ReviewsService {
    constructor(private prisma: PrismaService) {}

    async getReviews() {
        return this.prisma.review.findMany();
    }

        async createReview() {
            return this.prisma.review.create({
                data: {
                    title: "My Review",
                    description: "My Review Description",
                    rating_cxb: 5,
                    rating_price: 5,
                    rating_quality: 5,
                    rating_overall: 5,
                    timestamp: new Date(),
                }
            });
        }

}
