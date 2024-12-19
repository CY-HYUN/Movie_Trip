'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function AuthProvider() {
    const router = useRouter();

    // 로그인이 되어있지 않다면 로그인 페이지로 이동
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
        }
    }, []);
    return null;
}
