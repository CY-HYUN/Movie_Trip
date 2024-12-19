"use client";
import { useRouter } from "next/navigation";
import React from "react";

type RegionBoxProps = {
  name: string;
  name2?: string;
  engName: string;
  img: string;
  img2?: string;
};

export default function RegionBox({
  name,
  name2,
  engName,
  img,
  img2,
}: RegionBoxProps) {
  const router = useRouter();

  const handleRouter = () => {
    if (name === "서울특별시") {
      router.push(`/region/${engName}`);
    } else if (name === "인천광역시") {
      router.push(`/region/${engName}`);
    } else if (name === "경기도") {
      router.push(`/region/${engName}`);
    } else if (name === "강원특별자치도") {
      router.push(`/region/${engName}`);
    } else if (name === "충청도") {
      router.push(`/region/${engName}`);
    } else if (name === "경상도") {
      router.push(`/region/${engName}`);
    } else if (name === "부산,대구") {
      router.push(`/region/${engName}`);
    } else if (name === "전라도") {
      router.push(`/region/${engName}`);
    }
  };

  return (
    <div
      className="w-full sm:w-auto py-2 px-4 sm:py-[10px] sm:px-[40px] cursor-pointer rounded-[10px] bg-[#D9D9D9] flex flex-col gap-2 sm:gap-4 items-center justify-center"
      onClick={handleRouter}
    >
      <img
        className="w-[80px] h-[60px] sm:w-[120px] sm:h-[80px]"
        src={img}
        alt={name}
      />
      {img2 && (
        <img
          className="w-[80px] h-[60px] sm:w-[120px] sm:h-[80px]"
          src={img2}
          alt={`sec-${name}`}
        />
      )}
      <p className="text-black text-[18px] sm:text-[23px] font-bold">{name}</p>
      {name2 && (
        <p className="text-black text-[18px] sm:text-[23px] font-bold">
          {name2}
        </p>
      )}
    </div>
  );
}
