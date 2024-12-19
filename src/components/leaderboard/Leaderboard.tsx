import React from "react";
import RankProfile from "./RankProfile";

export default function Leaderboard() {
  return (
    <div className="w-3/5 h-[700px] bg-[#c2c2c2] rounded-xl flex flex-col items-center ">
      <h2 className="text-[32px] font-[500] mt-[42px]">Leaderboard</h2>
      <div className="w-full mt-[120px] relative">
        <RankProfile name="Mintaek" point={1500} rank={1} isRank={true} />
        <RankProfile name="Mintaek" point={1500} rank={2} isRank={false} />
        <RankProfile name="Mintaek" point={1500} rank={3} isRank={false} />
      </div>
    </div>
  );
}
