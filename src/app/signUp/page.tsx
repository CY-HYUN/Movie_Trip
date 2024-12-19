import SignUpContainer from '@/components/SignUpContainer';
import React from 'react';

export default function SignUpPage() {
    return (
        <div className="w-full h-full bg-login-background bg-cover bg-center relative ">
            <h1 className="font-[700] text-[64px] text-[#7d99a7] absolute left-[6%] top-[15%]">무비 트립</h1>
            <SignUpContainer />
        </div>
    );
}
