import { useState } from "react";
import { CommonPlaceDataType, MoviePlaceDataType } from "@/type/movieType";
import React, { useEffect } from "react";
import CheckBackground from "../common/CheckBackground";
import { useRecoilValue } from "recoil";
import { selectPlaceState } from "@/atom/selectPlaceStore";
import { FaInfoCircle } from "react-icons/fa"; // 'i' 아이콘을 위해 사용

type PlaceBoxType = {
  movie: MoviePlaceDataType;
  handleClick?: (movie: MoviePlaceDataType) => void;
};

export default function PlaceBox({
  movie,
  handleClick = () => {},
}: PlaceBoxType) {
  // 팝업창의 열림 상태를 관리하기 위한 state 추가
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 장소 컴포넌트
  const selectedPlace = useRecoilValue(selectPlaceState);

  // 팝업 열기/닫기 핸들러
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div
      key={movie.moviePlaceId}
      className="w-full sm:w-[240px] md:w-[280px] lg:w-[340px] h-[180px] sm:h-[200px] md:h-[220px] flex flex-col items-center"
    >
      <div
        className="w-full h-[80%] rounded-lg cursor-pointer relative"
        onClick={() => handleClick(movie)}
      >
        <img
          src={`/images/place/${movie.title}/${movie.placeName}.png`}
          alt="장소 이미지"
          className="w-full h-full rounded-lg object-cover"
        />
        {selectedPlace.find(
          (item) => item.moviePlaceId === movie.moviePlaceId,
        ) && <CheckBackground />}
      </div>
      <div className="w-[80%] sm:min-w-[60%] px-2 py-1 flex items-center justify-center bg-[#030303] rounded-full mt-1 relative">
        <p className="text-sm sm:text-[16px] md:text-[18px] text-white text-center">
          {movie.placeName}
        </p>
        <FaInfoCircle
          className="text-white text-sm sm:text-[16px] md:text-[18px] ml-2 cursor-pointer"
          onClick={togglePopup} // 아이콘 클릭 시 팝업 열기/닫기
        />
      </div>

      {/* 팝업 창 */}
      {isPopupOpen && (
        <div className="absolute bg-white p-4 rounded shadow-lg w-45 sm:w-64 lg:w-80 z-10">
          <h3 className="font-bold text-lg mb-2">{movie.placeName}</h3>
          <p className="text-sm text-gray-700 mb-1">주소: {movie.address}</p>
          <p className="text-sm text-gray-700">장소설명: {movie.description}</p>
          <button
            className="mt-2 text-blue-500 hover:underline"
            onClick={togglePopup}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
