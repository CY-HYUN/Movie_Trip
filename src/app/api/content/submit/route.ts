import { getPrismaClient } from "@/utils/util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { prisma } = getPrismaClient();
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 },
    );
  }

  try {
    const userSaveRoute = await prisma.userSaveRoute.findMany({
      where: {
        userId: Number(userId),
        contentType: "지역",
        progress: 100,
      },
    });

    // 항상 명확하게 응답을 반환
    return NextResponse.json({ userSaveRoute });
  } catch (error) {
    console.error("Error fetching user save route:", error);

    // 오류가 발생한 경우 응답 반환
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
