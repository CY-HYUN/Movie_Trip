import React from "react";

type RankProfileType = {
  name: string;
  point: number;
  isRank: boolean;
  rank: 1 | 2 | 3
};

export default function RankProfile({ name, point, rank, isRank }: RankProfileType) {

    const getRankStyle = () => {
        if (rank === 1) {
            return "left-1/2 -translate-x-1/2";
        }
        if (rank === 2) {
            return "top-16 left-[18%]";
        }
        if (rank === 3) {
            return "top-16 right-[18%]";
        }
    }
  return (
    <div className={`flex flex-col items-center gap-[2px] absolute ${getRankStyle()}`}>
      <div className="w-20 h-20 rounded-full border-[3px] border-[#5856d6]">
        <img
          src="/images/profile.jpeg"
          alt="프로필 이미지"
          className="w-full h-full rounded-[inherit]"
        />
      </div>
      <p className="text-[#030303] text-[18px] font-[700] mt-1">{name}</p>
      <p className="text-[#5856d6] text-[18px] font-[500] relative bottom-2">{point}</p>
      <p className="text-[#000000] text-[14px] relative bottom-3">@{name}</p>
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        {isRank && (
          <img src="/images/Ranker.svg" alt="랭크 아이콘" className="w-10 h-10" />
        )}
      </div>
    </div>
  );
}
