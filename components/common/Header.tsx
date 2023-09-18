import Link from "next/link";
import React from "react";

const BUTTON_CLASS = "transition-all cursor-pointer hover:scale-105 mx-1";
const HeaderComponent = () => {
  return (
    <header className="flex justify-between p-2 bg-green-300">
      <h1>React App</h1>
      <nav className="flex items-center gap-28 font-semibold">
        <Link href='/'>
        <p className={BUTTON_CLASS}>전국 포인트</p>
        </Link>
        <p className={BUTTON_CLASS}>나만의 포인트</p>
        <p className={BUTTON_CLASS}>커뮤니티</p>
      </nav>
        <nav className="flex items-center gap-4 font-semibold">
        <button className={BUTTON_CLASS}>로그인</button>
        <button className={BUTTON_CLASS}>회원가입</button>
        </nav>
    </header>
  );
};

export default HeaderComponent;
