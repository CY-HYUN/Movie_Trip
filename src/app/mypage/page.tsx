import Divider from "@/components/common/Divider";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="w-full flex flex-col items-center">
      <Divider />

      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-16 lg:gap-[210px] mt-8 sm:mt-12 lg:mt-[181px]">
        <Link href={"mypage/totalRoute"} className="flex flex-col items-center">
          <p className="text-[20px] sm:text-[28px] lg:text-[36px]">
            전체 현황 보기
          </p>
          <img
            className="w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] lg:w-[225px] lg:h-[225px] rounded-lg shadow-lg lg:p-10 p-4"
            src="/images/전체지도.jpg"
            alt="전체 현황 보기"
          />
        </Link>
        <Link href={"mypage/myRoute"} className="flex flex-col items-center">
          <p className="text-[20px] sm:text-[28px] lg:text-[36px]">
            내가 저장한 경로 보기
          </p>
          <img
            className="w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] lg:w-[225px] lg:h-[225px] rounded-lg shadow-lg  lg:p-10 p-4"
            src="/images/경로.jpg"
            alt="내가 저장한 경로 보기"
          />
        </Link>
        <Link href={""} className="flex flex-col items-center">
          <p className="text-[20px] sm:text-[28px] lg:text-[36px]">캘린더</p>
          <img
            className="w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] lg:w-[225px] lg:h-[225px] rounded-lg shadow-lg  lg:p-10 p-4"
            src="/images/캘린더.jpg"
            alt="캘린더"
          />
        </Link>
      </div>
    </div>
  );
}
