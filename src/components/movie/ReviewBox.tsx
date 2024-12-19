import React from "react";

export default function ReviewBox({ review }: { review: any }) {
  const arr = new Array(5).fill(0);

  // 리뷰 박스 컴포넌트
  return (
    <div className="w-full h-[62px] flex gap-3 border-b border-[#c1c1c1]">
      <div className="w-[40px] h-[45px] rounded-md">
        <img
          src="/images/profile.jpeg"
          alt="프로필 이미지"
          className="w-full h-full rounded-[inherit]"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2 items-center text-[14px]">
          <p>{review.authorName}</p>
          {arr.map((item, i) => (
            <span
              key={i}
              className={
                i < review.rating ? "text-[#ffc107]" : "text-[#c1c1c1]"
              }
            >
              {i < review.rating ? (
                <img
                  src="/images/activeStar.png"
                  alt="별점 이미지"
                  className="w-3 h-3"
                />
              ) : (
                <img
                  src="/images/defaultStar.png"
                  alt="별점 이미지"
                  className="w-3 h-3"
                />
              )}
            </span>
          ))}
        </div>
        <div>
          <p>{review.content}</p>
        </div>
      </div>
    </div>
  );
}
