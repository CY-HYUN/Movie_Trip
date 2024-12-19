import { getPrismaClient } from "@/utils/util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { prisma } = getPrismaClient();
    const params = request.nextUrl.searchParams.get("userId");
    try {
      const userSaveRoute = await prisma.userSaveRoute.findMany({
        where: {
          userId: Number(params),
        },
      });
  
      return (userSaveRoute ) && NextResponse.json({ userSaveRoute });
    } catch (error) {
      console.error(error);
      NextResponse.json({ message: "Internal server error" });
    }
  }

  export async function DELETE(request: NextRequest) {
    const { prisma } = getPrismaClient();
    const params = request.nextUrl.searchParams.get("userSaveRouteId");

    console.log(params)
    try {
      const userSaveRoute = await prisma.userSaveRoute.delete({
        where: {
          userSaveRouteId: Number(params),
        },
      });
  
      return (userSaveRoute ) && NextResponse.json({ userSaveRoute });
    } catch (error) {
      console.error(error);
      NextResponse.json({ message: "Internal server error" });
    }
  }