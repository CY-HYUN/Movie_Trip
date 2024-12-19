import { getPrismaClient } from '@/utils/util';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const reqReview = await request.json();
    const { content, rating, movieTitle, authorId, authorName } = reqReview;

    const { prisma } = getPrismaClient();
    const newReview = {
        content,
        rating,
        movieTitle,
        authorId,
        authorName,
        createdAt: new Date(),
        updatedAt: null,
        deletedAt: null,
    };
    try {
        const resReview = await prisma.movieReview.create({
            data: newReview,
        });
        return resReview && NextResponse.json({ data: resReview, status: 200 });
    } catch (error) {
        console.error(error);
        NextResponse.json({ message: 'Internal server error' });
    }
}

export async function GET(request: NextRequest) {
    const prisma = new PrismaClient();
    const movieTitle = request.nextUrl.searchParams.get('movieTitle');
    console.log(movieTitle);
    try {
        if (movieTitle) {
            const resReviewList = await prisma.movieReview.findMany({
                where: {
                    movieTitle: movieTitle as string,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return resReviewList && NextResponse.json({ data: resReviewList, status: 200 });
        }
        return NextResponse.json({ message: '리뷰가 없습니다.', status: 200 });
    } catch (error) {
        console.error(error);
        NextResponse.json({ message: 'Internal server error' });
    }
}
