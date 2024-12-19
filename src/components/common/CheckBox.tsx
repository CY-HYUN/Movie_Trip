'use client'
import React, { useState } from "react";

export default function CheckBox({ name, value }: {name: string, value: boolean}) {
    const [isChecked, setIsChecked] = useState(value);

  return (
    <label htmlFor={name} className="w-[30px] h-[30px] cursor-pointer">
      <input
        id={name}
        name={name}
        defaultChecked={value}
        className="appearance-none hidden"
      />
      {
        isChecked ? (
            <img src="/images/activeCheckbox.png" alt="체크박스" />
        ): (
            <img src="/images/defaultCheckbox.png" alt="빈 체크박스" />
        )
      }
    </label>
  );
}
