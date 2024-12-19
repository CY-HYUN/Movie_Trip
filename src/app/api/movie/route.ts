import { getPrismaClient } from "@/utils/util";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { prisma } = getPrismaClient();
  try {
    const findMovies = await prisma.movie.findMany();
    return NextResponse.json(findMovies); // 명시적으로 응답 반환
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    ); // 응답 반환
  }
}
