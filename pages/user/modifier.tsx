/* eslint-disable */
"use client";

import { useState } from "react";
import { modifierUser } from "../api/modifier";
import { useRouter } from "next/router";

export default function Modifier() {
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const onPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };
  const onNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.currentTarget.value);
  };
  const onEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  // 회원정보 수정
  const modifierBtn = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const response = await modifierUser({ password, nickname, email });
    try {
      alert("회원정보 수정 완료");
      router.push("/user/myinfo");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <form>
          비밀번호
          <input type="password" onChange={onPassword} value={password} />
          닉네임
          <input type="nickname" onChange={onNickname} value={nickname} />
          이메일
          <input type="email" onChange={onEmail} value={email} />
          <button onClick={modifierBtn}>수정하기</button>
        </form>
      </div>
    </>
  );
}
