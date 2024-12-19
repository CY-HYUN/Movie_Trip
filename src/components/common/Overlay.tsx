import React from "react";

export default function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-50">
      {children}
    </div>
  );
}
