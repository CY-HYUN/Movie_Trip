import { getPrismaClient } from "@/utils/util";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { prisma } = getPrismaClient();
  const params = request.nextUrl.searchParams.get("category");
  console.log(params);

  try {
    if (!params) {
      return NextResponse.json({ message: "카테고리를 잘못되었습니다." });
    }

    let findContentPlace;

    switch (params) {
      case "종로-고궁":
      case "종로-공원과 카페":
      case "마포-맛집":
      case "용산,중구":
        findContentPlace = await prisma.seoulPlace.findMany({
          where: {
            category: params as string,
          },
          orderBy: {
            seqNo: "asc",
          },
        });
        break;
      case "광주":
      case "순천":
      case "담양":
      case "전주":
        findContentPlace = await prisma.jeollaPlace.findMany({
          where: {
            category: params as string,
          },
          orderBy: {
            seqNo: "asc",
          },
        });
        break;
      case "동구 - 랜드마크, 유적지":
      case "서구 - 자연테마":
      case "중구 - 바다":
      case "연수구 - 첨단문화, 맛집":
        findContentPlace = await prisma.incheonPlace.findMany({
          where: {
            category: params as string,
          },
          orderBy: {
            seqNo: "asc",
          },
        });
        break;

      case "중부 - 휴양, 여가":
      case "동부 -역사문화유산":
      case "남부 - 첨단문화":
      case "북부 - 자연, 야외활동":
        findContentPlace = await prisma.gyeonggiPlace.findMany({
          where: {
            category: params as string,
          },
          orderBy: {
            seqNo: "asc",
          },
        });
        break;

      case "춘천 - 자연테마":
      case "강릉 - 유명 관광지":
      case "동해 - 자연관광":
      case "정선 - 즐길거리":
        findContentPlace = await prisma.gangwonPlace.findMany({
          where: {
            category: params as string,
          },
          orderBy: {
            seqNo: "asc",
          },
        });
        break;

      case "논산-자연, 테마":
      case "아산-자연, 테마":
      case "청주-맛집, 카페":
      case "충주-체험":
        findContentPlace = await prisma.chungcheongPlace.findMany({
          where: {
            category: params as string,
          },
          orderBy: {
            seqNo: "asc",
          },
        });
        break;

      case "군위-힐링":
      case "포항-박물관, 맛집":
      case "합천-테마파크":
      case "안동-문화, 맛집":
        findContentPlace = await prisma.gyeongsangPlace.findMany({
          where: {
            category: params as string,
          },
          orderBy: {
            seqNo: "asc",
          },
        });
        break;

      case "서부산 - 자연여행":
      case "동래.서면.원도심 - 볼거리":
      case "동부산 - 힐링여행":
      case "대구 - 볼거리":
        findContentPlace = await prisma.busanPlace.findMany({
          where: {
            category: params as string,
          },
          orderBy: {
            seqNo: "asc",
          },
        });
        break;

      default:
        return NextResponse.json({ message: "잘못된 카테고리입니다." });
    }

    return findContentPlace && NextResponse.json({ findContentPlace });
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

export async function POST(request: NextRequest) {
  const { prisma } = getPrismaClient();
  const userProgressCreateData = await request.json();
  console.log(userProgressCreateData);
  try {
    const userSaveRoute = await prisma.userSaveRoute.findFirst({
      where: {
        content: userProgressCreateData.content,
      },
    });
    console.log(userSaveRoute);
    if (userSaveRoute) {
      return NextResponse.json({
        code: 403,
        message: "이미 저장된 콘텐츠입니다.",
      });
    }
    const userProgressSaveRes = await prisma.userSaveRoute.create({
      data: userProgressCreateData,
    });

    return userProgressSaveRes && NextResponse.json({ userProgressSaveRes });
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

export async function PATCH(request: NextRequest) {
  const { prisma } = getPrismaClient();
  const userProgressUpdateData = await request.json();
  console.log(userProgressUpdateData);
  try {
    const userSaveRoute = await prisma.userSaveRoute.findFirst({
      where: {
        userId: Number(userProgressUpdateData.userId),
        content: userProgressUpdateData.content,
      },
    });

    if (userSaveRoute) {
      const prevData = JSON.parse(userSaveRoute.successRoute);
      const prevSuccessRoute = prevData.find(
        (route: any) => route.place === userProgressUpdateData.route.placeName
      );
      if (prevSuccessRoute) {
        // 이미 도착한 장소 예외처리
        if (prevSuccessRoute.isSuccess) {
          return NextResponse.json({
            code: 403,
            message: "이미 도착한 장소입니다.",
          });
        }

        // 도착한 장소 업데이트
        const updateRoute = prevData.map((route: any) => {
          if (route.place === userProgressUpdateData.route.placeName) {
            route.isSuccess = true;
          }
          return route;
        });

        // 업데이트된 데이터 저장
        const userProgressUpdateRes = await prisma.userSaveRoute.update({
          where: {
            userSaveRouteId: userSaveRoute.userSaveRouteId,
          },
          data: {
            successRoute: JSON.stringify(updateRoute),

            // 진행률 계산
            progress: Math.round(
              (updateRoute.filter((route: any) => route.isSuccess).length /
                updateRoute.length) *
                100
            ),
          },
        });

        return (
          userProgressUpdateRes && NextResponse.json({ userProgressUpdateRes })
        );
      }
    }
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
