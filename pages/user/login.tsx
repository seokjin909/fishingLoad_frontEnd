"use client";

import Link from "next/link";
import { useState } from "react";
import { loginFetcher } from "../api/login";
import { useRouter } from "next/router";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setUserPassword] = useState("");
  const router = useRouter();

  const onIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.currentTarget.value);
  };
  const onPwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.currentTarget.value);
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await loginFetcher({ userId, password });
      if (response.status === 200) {
        const accessToken = response.headers.authorization;
        const refreshToken = response.headers.authorization_refresh;

        localStorage.setItem("authorization", accessToken);
        localStorage.setItem("authorization_refresh", refreshToken);

        alert("로그인 성공");
        setUserId("");
        setUserPassword("");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="w-40 bg-slate-200 h-40 text-center shadow-lg rounded-xl">
        로고
      </div>
      <div className="flex flex-col justify-center">
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-center"
        >
          <input
            className="text-2xl font-bold mt-6 shadow-md h-12 hover:scale-110"
            type="text"
            value={userId}
            placeholder="아이디 :"
            onChange={onIdChange}
          />
          <input
            className="text-2xl font-bold mt-6 shadow-md h-12 hover:scale-110"
            type="password"
            value={password}
            placeholder="비밀번호 :"
            onChange={onPwChange}
          />
          <button className="text-2xl font-bold mt-6 shadow-md h-12 bg-orange-300 rounded-md px-5 hover:bg-orange-600 hover:scale-110 active:bg-yellow-400 transition-all">
            로그인
          </button>
        </form>
        <div className="flex items-center justify-between space-x-8 w-12/12 mt-6">
          <Link href="/user/findPW">
            <span className="font-bold text-lg">비밀번호 찾기</span>
          </Link>
          <Link href="/user/findID">
            <span className="font-bold text-lg">아이디 찾기</span>
          </Link>
          <button>
            <Link href="/user/signup">
              <span className="font-bold text-lg">회원가입</span>
            </Link>
          </button>
          <button className="font-bold text-lg">
            <Link href="/user/myinfo">마이페이지로</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
