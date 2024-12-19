// FindIdContainer.tsx
'use client';
import React, { FormEvent, useState } from 'react';
import Input from './common/Input';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Overlay from './common/Overlay';
import Popup from './common/Popup';

export default function FindIdContainer() {
    const [findIdForm, setFindIdForm] = useState({
        email: '',
    });
    const [findIdSuccess, setFindIdSuccess] = useState(false);
    const [isErrorPopup, setIsErrorPopup] = useState(false);
    const [foundId, setFoundId] = useState('');

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFindIdForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFindId = (e: FormEvent) => {
        e.preventDefault();
        const params = {
            email: findIdForm.email,
        };
        axios
            .get(`/api/auth`, { params }) // 수정된 경로
            .then((res) => {
                console.log(res);
                if (res.data.status === 200) {
                    setFoundId(res.data.data); // 찾은 아이디 설정
                    setFindIdSuccess(true);
                }

                if(res.data.status === 404) {
                    setIsErrorPopup(true);
                }
            })
            .catch((error) => {
                console.error('Error occurred:', error);
            });
    };

    const handleHomePage = () => {
        setFindIdSuccess(false);
        router.push('/');
    };

    return (
        <>
            <form className="w-[90%] max-w-md flex flex-col gap-[22px] items-center px-10 py-8 absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-[#2d1010] rounded-md">
                <h2 className="text-[#c2c2c2] text-[24px] font-[700]">아이디 찾기</h2>
                <div className="w-full flex flex-col items-start justify-start">
                    <label className="text-[24px] text-[#c2c2c2] font-[700]">이메일</label>
                    <Input name="email" value={findIdForm.email} placeHolder="이메일" onChange={handleChange} />
                </div>
                <div className="w-full">
                    <button className="move-button" onClick={handleFindId}>
                        아이디 찾기
                    </button>
                </div>
            </form>
            {findIdSuccess && (
                <Overlay>
                    <Popup
                        closePopup={() => setFindIdSuccess(false)}
                        title="아이디 찾기 성공!"
                        desc={`입력하신 이메일로 아이디 ${foundId}가 전송되었습니다.`} // 수정된 메시지
                        onClick={handleHomePage}
                    />
                </Overlay>
            )}
            {isErrorPopup && (
                <Overlay>
                <Popup
                    closePopup={() => setIsErrorPopup(false)}
                    title="아이디 찾기 실패"
                    desc={`아이디 찾기에 실패하였습니다.`} // 수정된 메시지
                    onClick={() => setIsErrorPopup(false)}
                />
            </Overlay>
            )}
        </>
    );
}
