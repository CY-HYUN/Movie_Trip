import React from 'react';

export default function Divider({height='h-[17px]'}: {height?: string}) {
    return (
        <div className={`w-full ${height} min-h-[8px] bg-purple-500`} />
    );
}

