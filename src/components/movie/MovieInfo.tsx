import { MovieDataType } from "@/type/movieType";
import React from "react";

export default function MovieInfo({
  movieInfo,
  handleSubmit,
}: {
  movieInfo: MovieDataType;
  handleSubmit: () => void;
}) {
  return (
    <div className="w-full flex flex-col lg:w-full lg:flex-row justify-center mt-4">
      <div className="w-full flex flex-col lg:flex-row px-4 sm:px-8 lg:px-16 py-3 gap-5">
        <div className="w-[200px] lg:w-[280px] h-auto lg:h-[330px] flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#c1c1c1]">
          <img
            className="w-full lg:min-w-[252px] w-full h-full rounded-lg"
            src={`/images/poster/${movieInfo.title}.jpg`}
            alt="영화 포스터 이미지"
          />
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-6 text-[#030303] font-[700]">
            <p className="text-[20px] sm:text-[22px] lg:text-[24px]">
              영화 정보
            </p>
            <p className="text-[14px] sm:text-[16px] lg:text-[18px]">
              {movieInfo.plot}
            </p>
            <p className="text-[14px] sm:text-[16px] lg:text-[18px]">
              개봉일: {movieInfo.releaseDate}
            </p>
            {movieInfo.audience ? (
              <p className="text-[14px] sm:text-[16px] lg:text-[18px]">
                관객수 : {movieInfo.audience}
              </p>
            ) : (
              <p className="text-[14px] sm:text-[16px] lg:text-[18px]">
                시청률: {movieInfo.peekview}
              </p>
            )}
            <p className="text-[14px] sm:text-[16px] lg:text-[18px]">
              평점: {movieInfo.rating}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-auto flex flex-col items-center lg:items-end gap-5 px-4 sm:px-8 lg:px-16 py-4 ">
        <div className="w-full sm:w-[240px] lg:w-[282px] h-[52px] flex items-center justify-between p-2 bg-black rounded-lg">
          <p className="text-[#f2f2f2] text-[20px] sm:text-[22px] lg:text-[24px]">
            {movieInfo.title}
          </p>
          <img
            src="/images/Search.png"
            alt="검색 아이콘"
            className="w-[30px] sm:w-[35px] lg:w-[40px] h-[30px] sm:h-[35px] lg:h-[40px]"
          />
        </div>
        <button
          className="w-[120px] sm:w-[130px] lg:w-[140px] h-[40px] sm:h-[45px] lg:h-[50px] bg-[#9356d6] text-white text-[16px] sm:text-[18px] lg:text-[20px] rounded-lg"
          onClick={handleSubmit}
        >
          <p>선택 완료</p>
        </button>
      </div>
    </div>
  );
}
