"use client";
import { userState } from "@/atom/userStore";
import React from "react";
import { useRecoilValue } from "recoil";
import Divider from "../common/Divider";

export default function MypageCategory() {
  const userInfo = useRecoilValue(userState);

  return (
    <div className="w-full max-w-[220px] flex flex-col items-center">
      <div className="w-full flex flex-col items-center justify-center">
        <img
          src="/images/profile.jpeg"
          alt="프로필 이미지"
          className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] lg:w-[70px] lg:h-[70px] rounded-lg"
        />
        <div className="w-full flex gap-1 items-center justify-center mt-2">
          <p className="text-[18px] sm:text-[20px] lg:text-[24px] font-[700] text-[#030303]">
            {userInfo.userName}
          </p>
          <img
            src="/images/editIcon.svg"
            alt="수정이미지"
            className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] lg:w-[35px] lg:h-[35px]"
          />
        </div>
      </div>
    </div>
  );
}
