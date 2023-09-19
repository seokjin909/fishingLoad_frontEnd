import Link from "next/link";
import React from "react";
import { GiFishingPole} from "react-icons/gi"

const BUTTON_CLASS = "transition-all cursor-pointer hover:scale-105 mx-1 hover:text-blue-300";
const HeaderComponent = () => {
  return (
    <header className="flex justify-between p-4">
      <Link href='/'>
      <div className="flex justify-center items-center gap-2 font-bold text-2xl border-white border p-2 rounded-md bg-blue-300">
        FISH App <GiFishingPole />
      </div>
      </Link>
      <nav className="flex items-center gap-28 font-semibold">
        <Link href='/'>
        <p className={BUTTON_CLASS}>전국 포인트</p>
        </Link>
        <p className={BUTTON_CLASS}>나만의 포인트</p>
        <Link href='/community'>
        <p className={BUTTON_CLASS}>커뮤니티</p>
        </Link>
      </nav>
      <nav className="flex items-center gap-4 font-semibold">
        <button className={BUTTON_CLASS}>로그인</button>
        <button className={BUTTON_CLASS}>회원가입</button>
      </nav>
    </header>
  );
};

export default HeaderComponent;
