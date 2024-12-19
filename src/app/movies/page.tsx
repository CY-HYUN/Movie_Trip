"use client";
import Divider from "@/components/common/Divider";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MovieDataType } from "@/type/movieType";

export default function MainPage() {
  const [movies, setMovies] = useState<MovieDataType[]>([]);

  // 영화 정보 가져오기
  useEffect(() => {
    axios.get(`/api/movie`).then((res) => {
      setMovies(res.data);
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <Divider />
      <div className="w-full max-w-[1920px] flex flex-col items-center px-4 sm:px-20 lg:px-40 py-8">
        <div className="w-full flex items-center justify-between py-4">
          <h2 className="font-[600] text-[20px] sm:text-[24px] lg:text-[28px]">
            여행에 담고 싶은 컨텐츠를 선택하세요
          </h2>
        </div>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {movies.map((movie, i) => {
            return (
              <Link
                key={movie.movieId}
                href={`/movies/${movie.title}`}
                className="flex flex-col items-center"
              >
                <div
                  key={i}
                  className="w-[120px] h-[160px] sm:w-[180px] sm:h-[240px] lg:w-[250px] lg:h-[320px] rounded-lg"
                >
                  <img
                    className="w-full h-full rounded-[inherit]"
                    src={`/images/poster/${movie.title}.jpg`}
                    alt="영화 포스터"
                  />
                </div>
                <p className="text-[14px] sm:text-[16px] lg:text-[18px]">
                  {movie.title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
