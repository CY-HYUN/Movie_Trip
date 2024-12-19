"use client";
import React, { FormEvent, useState } from "react";
import Input from "./common/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "@/atom/userStore";
import Overlay from "./common/Overlay";
import Popup from "./common/Popup";

export default function LoginContainer() {
  const [loginForm, setLoginForm] = useState({
    id: "",
    pw: "",
  });

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("에러");

  // 에러 메시지 처리
  const handleErrorMessage = () => {
    setIsError(true);

    setTimeout(() => {
      setIsError(false);
    }, 3000);
  };
  const setUser = useSetRecoilState(userState);

  const router = useRouter();

  // 로그인 폼 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  // 로그인 처리
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // 로그인 처리
    axios
      .post(`/api/user/login`, loginForm)
      .then((res) => {
        if (res.data.status === 200 && typeof window !== "undefined") {
          localStorage.setItem("id", res.data.data.userInfo.id);
          localStorage.setItem("userName", res.data.data.userInfo.userId);
          localStorage.setItem("email", res.data.data.userInfo.email);
          localStorage.setItem("token", res.data.data.token);
          setUser({
            userId: res.data.data.userInfo.id,
            userEmail: res.data.data.userInfo.email,
            userName: res.data.data.userInfo.userId,
          });
          router.push("/choice");
        } else {
          setErrorMsg(res.data.message);
          handleErrorMessage();
        }
      });
  };

  return (
    <>
      <div className=" flex items-center justify-center">
        <div className="w-[360px] h-[360px] flex flex-col gap-[22px] items-center p-4 justify-center items-center bg-[#2d1010] rounded-md">
          <form className="w-full flex flex-col items-center gap-2">
            <Input
              name="id"
              placeHolder="아이디"
              value={loginForm.id}
              onChange={handleChange}
            />
            <Input
              name="pw"
              placeHolder="비밀번호"
              value={loginForm.pw}
              onChange={handleChange}
              type="password"
            />
            {isError && <p className="text-[#ff0000]">{errorMsg}</p>}
            <button
              className="w-full h-[50px] flex items-center justify-center rounded-lg bg-[#5856d6] text-white cursor-pointer"
              onClick={handleLogin}
            >
              <p>로그인</p>
            </button>
          </form>
          <div className="w-4/5 flex flex-col items-center gap-2">
            <Link className="move-button" href={"/"}>
              아이디 / 비밀번호 찾기
            </Link>
            <Link className="move-button" href={"/signUp"}>
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
