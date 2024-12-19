"use client";
import { selectPlaceState } from "@/atom/selectPlaceStore";
import Divider from "@/components/common/Divider";
import KakaoMap from "@/components/movie/KakaoMap";
import PlaceCard from "@/components/region/PlaceCard";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { FaFilm } from "react-icons/fa";

export default function PlaceMapPage({
  params: { place },
}: {
  params: { place: string };
}) {
  const [contentPlace, setContentPlace] = useRecoilState(selectPlaceState);
  const [progress, setProgress] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  // 페이지 벗어날 때 선택한 장소 초기화
  const handleRouteSave = () => {
    const successRouteDatas = contentPlace.map((place) => {
      return {
        place: place.placeName,
        isSuccess: false,
      };
    });

    const userProgressCreateData = {
      userId: Number(localStorage.getItem("id")),
      content: decodeURIComponent(place),
      selectRoute: JSON.stringify(contentPlace),
      successRoute: JSON.stringify(successRouteDatas),
      contentType: "지역",
      progress,
    };
    // 경로 저장
    axios
      .post(
        `/api/content/${decodeURIComponent(
          place,
        )}`,
        userProgressCreateData,
      )
      .then((res) => {
        setIsPopupOpen(true);
        console.log(res.data);
        console.log("경로 저장 완료");
      });
  };

  useEffect(() => {
    if (!place) return;
    axios
      .get(
        `/api/content/${decodeURIComponent(
          place,
        )}`,
        {
          params: { category: decodeURIComponent(place) },
        },
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 403) {
          alert("이미 저장된 콘텐츠입니다.");
          return;
        } else {
          console.log(res.data.findContentPlace);
          setContentPlace(res.data.findContentPlace);
        }
      });
    return () => {
      setContentPlace([]);
    };
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col items-center">
        <Divider />
        <h1 className="text-[20px] sm:text-[22px] lg:text-[25px] mt-4 sm:mt-6 lg:mt-8">
          {decodeURIComponent(place)} 추천 경로
        </h1>
        <KakaoMap />
        <div className="w-full mt-[50px] sm:mt-[60px] lg:mt-[70px]">
          <Divider height="h-[1px]" />
        </div>
        <div className="w-full flex flex-col gap-[8px] sm:gap-[10px] lg:gap-[11px] pb-[30px] sm:pb-[32px] lg:pb-[36px] mt-4 sm:mt-5 lg:mt-6 items-center">
          <div className="px-[12px] sm:px-[14px] py-[8px] sm:py-[10px] border border-[#D0D5DD] rounded-[8px]">
            <p className="text-[#667085] text-[20px] sm:text-[22px] lg:text-[24px] font-bold">
              여행지: {decodeURIComponent(place)}
            </p>
          </div>
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            {contentPlace?.map((placeItem, index) => (
              <React.Fragment key={index}>
                <PlaceCard
                  region={decodeURIComponent(place)}
                  placeName={placeItem.placeName}
                  placeType={placeItem.placeType}
                />
                {index !== contentPlace.length - 1 && (
                  <img
                    className="w-[32px] sm:w-[40px] lg:w-[48px] h-[32px] sm:h-[40px] lg:h-[48px]"
                    src="/images/placeArrow.svg"
                    alt="화살표"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          <button
            onClick={handleRouteSave}
            className="px-4 sm:px-5 lg:px-6 py-3 sm:py-4 rounded-[6px] bg-[#2D3648] text-white text-[18px] sm:text-[20px] lg:text-[24px] font-bold mt-[50px] sm:mt-[60px] lg:mt-[70px]"
          >
            경로저장
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className="w-[90%] sm:w-[400px] lg:w-[546px] h-auto p-4 sm:p-6 flex flex-col gap-2 bg-white rounded-[8px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 shadow-lg">
          <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold">
            경로저장 완료!
          </p>
          <p className="text-[14px] sm:text-[16px] lg:text-[18px]">
            마이페이지에서 확인가능해요
          </p>
          <div
            onClick={() => setIsPopupOpen(false)}
            className="absolute right-[10px] top-[10px] cursor-pointer"
          >
            <img src="/images/popupClose.svg" alt="팝업 닫기" />
          </div>
        </div>
      )}
    </>
  );
}
