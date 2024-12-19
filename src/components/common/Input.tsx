import React from 'react';

type InputType = {
    name: string,
    value: string,
    placeHolder: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    width?: string,
    height?: string,
    type?: string,
}

export default function Input({ name, value, placeHolder, onChange, width = 'w-full', height = 'h-[50px]', type='text' }: InputType) {
    return (
        <input
            className={`${width} ${height} p-2 text-[#030303] rounded-lg outline-none`}
            type={type}
            name={name}
            value={value}
            placeholder={placeHolder}
            onChange={onChange}
        />
    );
}
