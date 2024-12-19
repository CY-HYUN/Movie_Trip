import React from 'react';

type AchievementsType = {
    name: string,
    desc: string,
    point: number,
    iconIndex: number,
}

export default function Achievements({name, desc, point, iconIndex}: AchievementsType) {
    return (
        <div className='w-[335px] bg-[#1e1f26] rounded-full flex items-center'>
            <div>
                <img src={`/images/Leaderboard_${iconIndex}.png`} alt="업적 아이콘" className='w-20 h-20 rounded-full' />
            </div>
            <div className='flex flex-col p-2'>
                <p className='text-[#6ac8d8] text-[18px] font-[600]'>{name}</p>
                <p className='text-[#eeeeee] text-[14px] mt-[9px]'>{desc}</p>
                <p className='text-[#858585] text-[12px]'>+{point}xp</p>
            </div>
        </div>
    );
}

