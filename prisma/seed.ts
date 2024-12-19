import { PrismaClient } from "@prisma/client";
import * as movieData from "../public/movieData.json";
import * as moviePlaceData from "../public/data.json";
import * as seoulPlaceData from "../public/서울.json";
import * as jeollaPlaceData from "../public/전라도.json";
import * as gangwonPlaceData from "../public/강원도.json";
import * as gyeonggiPlaceData from "../public/경기도.json";
import * as incheonPlaceData from "../public/인천.json";
import * as chungcheongPlaceData from "../public/충청.json";
import * as gyeongsangPlaceData from "../public/경상.json";
import * as busanPlaceData from "../public/부산.json";

const prisma = new PrismaClient();

async function seedData() {
  // movieData?.["DATA"]?.map(async (movie) => {
  //   const movieInfo = {
  //     title: movie.title,
  //     plot: movie.plot,
  //     releaseDate: movie.releaseDate,
  //     genre: movie.genre,
  //     audience: movie.type === "영화" ? movie.audience : null,
  //     peekview: movie.type === "드라마" ? movie.peekview : null,
  //     rating: movie.rating,
  //   };
  //   const result = await prisma.movie.create({ data: movieInfo });
  //   console.log(result);
  // });

  // moviePlaceData?.["DATA"]?.map(async (movie) => {
  //   const moviePlaceInfo = {
  //     mediaType: movie.MEDIA_TY,
  //     title: String(movie.TITLE_NM),
  //     placeName: movie.PLACE_NM,
  //     placeType: movie.PLACE_TY,
  //     description: movie.RELATE_PLACE_DC,
  //     operTime: movie.OPER_TIME,
  //     restTime: movie.REST_TIME,
  //     closedDay: movie.RSTDE_GUID_CN,
  //     address: movie.ADDR,
  //     lat: movie.LC_LA,
  //     lng: movie.LC_LO,
  //   };
  //   const result = await prisma.moviePlace.create({ data: moviePlaceInfo });
  //   console.log(result);
  // });

  // seoulPlaceData?.["DATA"]?.map(async (place) => {
  //   const seoulPlaceInfo = {
  //     seqNo: place.SEQ_NO,
  //     placeName: place.PLACE_NM,
  //     address: place.ADDR,
  //     location: place.AD,
  //     lat: place.LC_LA,
  //     lng: place.LC_LO,
  //     category: place.AREA,
  //     titmeName: place.TITLE_NM,
  //     placeDesc: place.RELATE_PLACE_DC,
  //     placeType: place.PLACE_TY,
  //   };
  //   const result = await prisma.seoulPlace.create({ data: seoulPlaceInfo });
  //   console.log(result);
  // });
  for (const place of busanPlaceData?.["DATA"] || []) {
    const busanPlaceInfo = {
      seqNo: place.SEQ_NO,
      placeName: place.PLACE_NM,
      address: place.ADDR,
      location: place.AD,
      lat: place.LC_LA,
      lng: place.LC_LO,
      category: place.AREA,
      titmeName: place.TITLE_NM,
      placeDesc: place.RELATE_PLACE_DC,
      placeType: place.PLACE_TY,
    };
    try {
      const result = await prisma.busanPlace.upsert({
        where: { seqNo: place.SEQ_NO }, // 고유 식별자를 seqNo으로 지정
        update: busanPlaceInfo, // 존재할 경우 업데이트할 데이터
        create: busanPlaceInfo, // 존재하지 않을 경우 생성할 데이터
      });
      console.log(result);
    } catch (e) {
      console.error(`Error inserting busan place: ${place.PLACE_NM}`, e);
    }
  }
}

async function main() {
  await seedData();
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
