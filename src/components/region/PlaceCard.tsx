import React from "react";
import { FaFilm } from "react-icons/fa";

export default function PlaceCard({
  region,
  placeName,
  placeType,
  isPlace,
}: {
  region: string;
  placeName: string;
  placeType: string;
  isPlace?: boolean;
}) {
  return (
    <div className="w-[244px] flex flex-col gap-[7px] items-center">
      <img
        className="w-full h-[155px]"
        src={
          isPlace
            ? `/images/place/${region}/${placeName}.png`
            : `/images/content/seoul/${region}/${placeName}.jpg`
        }
        alt=""
      />
      <div className="w-full grid place-items-center rounded-[10px] border border-black">
        <p className="text-[16px] flex items-center">
          {placeName}
          {placeType === "movie_location" && (
            <FaFilm className="ml-2 text-[#2D3648]" />
          )}
        </p>
      </div>
    </div>
  );
}
