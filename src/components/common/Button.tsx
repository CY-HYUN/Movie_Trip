import React from "react";

export default function Button({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) {
  return (
    <button
      className="w-full h-[60px] bg-black border-2 border-purple-500 text-white font-[500] text-[24px] rounded-lg p-2"
      onClick={onClick}
    >
      {name}
    </button>
  );
}
