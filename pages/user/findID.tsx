/* eslint-disable */
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { findId } from "./../api/find";

export default function findUserId() {
  const [email, setEmail] = useState("");
  const [findUserId, setUserFindId] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await findId({ email });
    try {
      setUserFindId(response.data.userId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <form onSubmit={onSubmit} className="flex items-center justify-center">
          <input
            className="text-2xl font-bold mt-6 shadow-md h-12 hover:scale-110"
            type="text"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={onChange}
          />
          <button className="text-2xl ml-5 font-bold mt-6 shadow-md h-12 bg-orange-300 rounded-md px-5 hover:bg-orange-600 hover:scale-110 active:bg-yellow-400 transition-all">
            찾기
          </button>
        </form>
        <div className="mt-6">
          <span className="text-red-500 font-bold text-2xl mb-6">
            {findUserId}
          </span>
        </div>
        <Link href="/user/login">
          <span className="font-bold text-lg">로그인 페이지로</span>
        </Link>
      </div>
    </>
  );
}
