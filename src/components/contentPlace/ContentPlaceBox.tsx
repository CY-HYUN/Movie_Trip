import Link from "next/link";
import React from "react";

export default function ContentPlaceBox({
  region,
  placeName,
}: {
  region: string;
  placeName: string;
}) {
  return (
    <Link
      href={`${region}/${placeName}`}
      className="flex flex-col items-center lg:items-start gap-3"
    >
      <img
        className="w-[265px] h-[235px]"
        src={`/images/content/place/${placeName}.jpg`}
        alt="구역 선택 이미지"
      />
      <div className="w-[225px] h-[50px] border border-[#D0D5DD] rounded-[8px] px-[14px] py-[10px]">
        <p className="text-[16px] text-[#667085]">{placeName}</p>
      </div>
    </Link>
  );
}
