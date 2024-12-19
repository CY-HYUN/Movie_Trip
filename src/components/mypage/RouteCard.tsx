import React, { useState } from "react";
import RadialBarChart from "../chart/RadialBarChart";
import Popup from "../common/Popup";
import Overlay from "../common/Overlay";
import axios from "axios";

type RouteCardProps = {
  userSaveRouteId: number;
  type: string;
  title: string;
  progress: number;
  handleDeleteTrigger?: () => void;
};

export default function RouteCard({
  userSaveRouteId,
  type,
  title,
  progress,
  handleDeleteTrigger,
}: RouteCardProps) {
  return (
    <>
      <div className="w-full h-full max-w-[1000px] h-auto sm:h-[150px] lg:h-[183px] relative">
        <div className="w-full h-[150px] rounded-[20px] flex flex-row sm:flex-row items-center relative border border-black shadow-xl cursor-pointer">
          <img
            className="w-[150px] sm:w-[180px] lg:w-[225px] h-[150px] sm:h-full rounded-l-[20px] sm:rounded-l-[20px] sm:rounded-tr-none"
            src={
              type === "지역"
                ? `/images/content/place/${title}.jpg`
                : `/images/poster/${title}.jpg`
            }
            alt=""
          />
          <div className="flex-1 flex flex-row sm:flex-row items-center px-[20px] sm:px-[25px] lg:px-[31px] py-[20px] sm:py-[40px] lg:py-[51px]">
            <div className="w-full sm:w-[200px] lg:w-[350px] h-auto sm:h-[82px] flex flex-col gap-[10px] sm:gap-[30px]  items-start">
              <span className="text-[14px] sm:text-[18px]">분류</span>
              <span className="text-[12px] sm:text-[16px] lg:text-[18px]">
                {type}
              </span>
            </div>
            <div className="w-full sm:w-auto flex flex-col gap-[10px] sm:gap-[30px]  items-start  sm:mt-0 ">
              <span className="text-[14px] sm:text-[18px] whitespace-nowrap">
                지역/컨텐츠
              </span>
              <span className="text-[12px] sm:text-[16px] lg:text-[18px]">
                {title}
              </span>
            </div>
            <div className="w-[80px] sm:w-[100px] h-[80px] sm:h-[100px] mt-4 sm:mt-0 ml-0 sm:ml-[80px] lg:ml-[160px] relative">
              {String(progress) && (
                <>
                  <RadialBarChart
                    data={[
                      { id: "chart", data: [{ x: "progress", y: progress }] },
                    ]}
                  />
                  <p className="absolute text-[24px] sm:text-[28px] lg:text-[36px] font-semibold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    {progress}%
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
