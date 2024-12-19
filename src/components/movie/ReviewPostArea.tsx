import { userState } from "@/atom/userStore";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useRecoilValue } from "recoil";

export default function ReviewPostArea({
  movieTitle,
  starRating,
  handleStarInitial,
  getMovieReview,
}: {
  movieTitle: string;
  starRating: number;
  handleStarInitial: () => void;
  getMovieReview: () => void;
}) {
  const [reviewText, setReviewText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useRecoilValue(userState);

  // 리뷰 텍스트 변경
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setReviewText(e.target.value);
  };

  // 리뷰 등록
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const reqReview = {
      authorId: Number(user.userId),
      authorName: user.userName,
      content: reviewText,
      rating: starRating,
      movieTitle: movieTitle,
    };
    axios
      .post(`/api/review`, reqReview)
      .then((res) => {
        handleStarInitial();
        setReviewText("");
        getMovieReview();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form className="flex flex-col items-center gap-2" onSubmit={handleSubmit}>
      <textarea
        className="w-full border border-[#9356d6] rounded-lg p-4"
        name="review"
        cols={5}
        rows={3}
        value={reviewText}
        onChange={handleChange}
        placeholder="리뷰를 입력해주세요."
      />
      <button className="w-[140px] h-[50px] bg-[#9356d6] text-white text-[18px] rounded-lg">
        <p>{isLoading ? "등록 중..." : "리뷰 등록"}</p>
      </button>
    </form>
  );
}
