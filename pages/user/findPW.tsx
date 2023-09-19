/* eslint-disable */
'use client'

import Link from "next/link";
import React, { useState } from "react";
import { findPw } from "../api/find";

export default function findPassword() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
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
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="아이디를 입력하세요"
            name="userId"
            value={userId}
            onChange={onChange}
          />
          <input
            type="text"
            name="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={onChange}
          />
          <button>찾기</button>
        </form>
        <Link href="/user/login">로그인 페이지로</Link>
      </div>
    </>
  );
}
