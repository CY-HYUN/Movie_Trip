import { MovieDataType, MoviePlaceDataType } from "@/type/movieType";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReviewContainer from "./ReviewContainer";
import PlaceBox from "./PlaceBox";
import Divider from "../common/Divider";
import MovieInfo from "./MovieInfo";
import { useRecoilState } from "recoil";
import { selectPlaceState } from "@/atom/selectPlaceStore";
import Popup from "../common/Popup";
import Overlay from "../common/Overlay";

export default function MovieDetails({
  movie,
  handleSelect,
}: {
  movie: string;
  handleSelect: (validateMoviePlace: boolean) => void;
}) {
  const CATEGORY_LIST = ["촬영지 선택", "리뷰 보기"];
  const [currentPage, setCurrentPage] = useState(0);
  const [moviePlaceData, setMoviePlaceData] = useState<MoviePlaceDataType[]>(
    [],
  );
  const [movieInfoData, setMovieInfoData] = useState<MovieDataType>();
  const [selectedPlace, setSelectedPlace] = useRecoilState(selectPlaceState);
  const [isAlert, setIsAlert] = useState(false);

  // 영화 정보 가져오기
  useEffect(() => {
    axios
      .get(
        `/api/movie/${decodeURIComponent(
          movie as string,
        )}`,
        {
          params: { title: decodeURIComponent(movie as string) },
        },
      )
      .then((res) => {
        setMoviePlaceData(res.data.findMoviePlace);
        setMovieInfoData(res.data.findMovie[0]);
      });
  }, []);

  // 촬영지 선택
  const handleClick = (movie: MoviePlaceDataType) => {
    // 최대 5개까지 선택 가능
    if (
      selectedPlace.length === 5 &&
      !selectedPlace.find((item) => item.moviePlaceId === movie.moviePlaceId)
    ) {
      setIsAlert(true);
      return;
    }
    // 선택한 촬영지가 이미 선택되어있는지 확인
    if (
      selectedPlace.find((item) => item.moviePlaceId === movie.moviePlaceId)
    ) {
      const filter = selectedPlace.filter(
        (item) => item.moviePlaceId !== movie.moviePlaceId,
      );
      setSelectedPlace(filter);
    } else {
      setSelectedPlace((prev) => [...prev, movie]);
    }
  };

  return (
    movieInfoData && (
      <>
        <div className="w-full h-full flex flex-col items-center">
          <Divider />
          <div className="w-full flex">
            {CATEGORY_LIST.map((category, i) => (
              <div
                key={i}
                className={`flex-1 h-[50px] flex items-center justify-center gap-2 sm:gap-6 font-[600] cursor-pointer ${
                  i !== CATEGORY_LIST.length - 1
                    ? "border-r border-[#c1c1c1]"
                    : ""
                }`}
                onClick={() => setCurrentPage(i)}
              >
                <p className="text-sm sm:text-base">{category}</p>
                {currentPage === i && (
                  <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#3164f4]" />
                )}
              </div>
            ))}
          </div>
          {CATEGORY_LIST[currentPage] === "촬영지 선택" ? (
            <>
              <MovieInfo
                movieInfo={movieInfoData}
                handleSubmit={() => handleSelect(selectedPlace.length > 0)}
              />

              <div className="w-full">
                <Divider />
                <div className="text-center mt-6 sm:-top-8">
                  <p className="text-[#030303] text-lg sm:text-[24px] font-[700]">
                    영화의 촬영지를 골라주세요
                  </p>
                </div>
              </div>
              <div className="w-full max-w-[1920px] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4 px-4 sm:px-16 py-4 sm:py-8">
                {moviePlaceData?.map((movie) => (
                  <PlaceBox
                    key={movie.moviePlaceId}
                    movie={movie}
                    handleClick={handleClick}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <ReviewContainer movieInfo={movieInfoData} />
            </>
          )}
        </div>
        {isAlert && (
          <Overlay>
            <Popup
              title="경고"
              desc="최대 5개까지 선택 가능합니다."
              closePopup={() => setIsAlert(false)}
              onClick={() => setIsAlert(false)}
            />
          </Overlay>
        )}
      </>
    )
  );
}
