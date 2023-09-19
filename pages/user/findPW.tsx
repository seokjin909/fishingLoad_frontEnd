/* eslint-disable */
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { findPw } from "../api/find";
import { useRouter } from "next/router";

export default function findPassword() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.currentTarget;

    name === "userId"
      ? setUserId(event.currentTarget.value)
      : setEmail(event.currentTarget.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await findPw({ email, userId });
    try {
      // 비밀번호 변경창으로
      if (response.status === 200) {
        router.push("/user/changePW");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center justify-center"
        >
          <input
            className="text-2xl font-bold mt-6 shadow-md h-12 hover:scale-110"
            type="text"
            placeholder="아이디를 입력하세요"
            name="userId"
            value={userId}
            onChange={onChange}
          />
          <input
            className="text-2xl font-bold mt-6 shadow-md h-12 hover:scale-110"
            type="text"
            name="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={onChange}
          />
          <button className="text-2xl mb-6 font-bold mt-6 shadow-md h-12 bg-orange-300 rounded-md px-5 hover:bg-orange-600 hover:scale-110 active:bg-yellow-400 transition-all">
            찾기
          </button>
        </form>
        <Link href="/user/login">
          <span className="font-bold text-lg">로그인 페이지로</span>
        </Link>
      </div>
    </>
  );
}
