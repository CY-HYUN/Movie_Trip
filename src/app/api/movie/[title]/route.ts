import { getPrismaClient } from "@/utils/util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { prisma } = getPrismaClient();
  const params = request.nextUrl.searchParams.get("title");

  // 유효성 검사: params가 없을 경우 오류 반환
  if (!params) {
    return NextResponse.json(
      { message: "Title parameter is required" },
      { status: 400 },
    );
  }
  const title = decodeURIComponent(params);
  try {
    const findMovie = await prisma.movie.findMany({
      where: {
        title: title, // params는 이미 문자열로 확인됨
      },
    });

    const findMoviePlace = await prisma.moviePlace.findMany({
      where: {
        title: title, // params는 이미 문자열로 확인됨
      },
    });

    // 모든 응답을 명확하게 반환
    return NextResponse.json({ findMovie, findMoviePlace });
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
