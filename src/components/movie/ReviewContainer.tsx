import React from "react";
import ReviewList from "./ReviewList";
import Divider from "../common/Divider";
import { MovieDataType } from "@/type/movieType";

export default function ReviewContainer({
  movieInfo,
}: {
  movieInfo: MovieDataType;
}) {
  // MovieInfo 컴포넌트에서 받아온 movieInfo를 props로 받아와서 사용
  return (
    <div className="w-full max-w-[1920px] flex flex-col justify-center mt-4 px-4 sm:px-8 md:px-16">
      <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-5 py-3">
        <div className="w-full sm:w-[200px] h-[300px] sm:h-[250px] flex items-center justify-center border-b sm:border-r border-[#c1c1c1]">
          <img
            className="w-full h-full sm:min-w-[200px] rounded-lg object-cover bg-center"
            src={`/images/poster/${movieInfo.title}.jpg`}
            alt="영화 포스터 이미지"
          />
        </div>
        <div className="flex flex-col gap-2 sm:gap-4 text-[#030303] font-[700]">
          <p className="text-lg sm:text-[24px]">{movieInfo.title}</p>
          <p className="text-sm sm:text-base">
            개봉일: {movieInfo.releaseDate}
          </p>
          <p className="text-sm sm:text-base">평점: {movieInfo.rating}</p>
          <p className="text-sm sm:text-base">{movieInfo.plot}</p>
        </div>
      </div>
      <ReviewList movieTitle={movieInfo.title} />
    </div>
  );
}
