import React from 'react';

export default function Popup({ title, desc, onClick, closePopup }: { title: string; desc: string; onClick: () => void, closePopup: () => void }) {
    return (
        <div className="w-[335px] h-[182px] flex flex-col bg-white rounded-lg shadow-xl fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4">
            <div className="flex items-center justify-between ">
                <p className='text-[18px] text-[#030303] font-bold'>{title}</p>
                <img className='cursor-pointer' src="/images/close.svg" alt="닫기 아이콘" width={25} height={25} onClick={closePopup} />
            </div>
            <p className='text-[12px] text-[#858585] font-[500] mt-4'>{desc}</p>
            <button className="w-full h-[38px] bg-[#9356d6] rounded-md flex items-center justify-center mt-12 text-white" onClick={onClick}>확인</button>
        </div>
    );
}
