'use client'

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GiFishingPole } from "react-icons/gi";
import { BiUserCircle } from "react-icons/bi";


const BUTTON_CLASS =
  "transition-all cursor-pointer hover:scale-105 mx-1 hover:text-blue-300";
const HeaderComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // 페이지 로드 시 localStorage에서 토큰을 확인하여 로그인 상태를 설정합니다.
  useEffect(() => {
    const token = localStorage.getItem("authorization");
    setIsLoggedIn(!!token); // 토큰이 있으면 로그인 상태로 설정합니다.
  }, []);

  // 로그아웃 함수
  const handleLogout = () => {
    // 로그아웃 로직을 수행한 후 로컬 스토리지에서 토큰을 삭제합니다.
    localStorage.removeItem("authorization");
    localStorage.removeItem("authorization_refresh");
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <header className="flex justify-between py-4 px-10">
      <Link href="/">
        <div className="flex justify-center items-center gap-2 font-bold text-2xl border-white border p-2 rounded-md bg-blue-300">
          FISH App <GiFishingPole />
        </div>
      </Link>
      <nav className="flex items-center gap-28 font-semibold">
        <Link href="/">
          <p className={BUTTON_CLASS}>전국 포인트</p>
        </Link>
        <p className={BUTTON_CLASS}>나만의 포인트</p>
        <Link href="/community">
          <p className={BUTTON_CLASS}>커뮤니티</p>
        </Link>
      </nav>

      {isLoggedIn ? ( // 로그인 상태에 따라 로그아웃 또는 로그인/회원가입 버튼을 표시합니다.
      <nav className="flex items-center gap-4 font-semibold">
      <Link href="/user/myinfo" className="text-2xl">
        <BiUserCircle />
      </Link>
        <button className={BUTTON_CLASS} onClick={handleLogout}>
          로그아웃
        </button>
    </nav>
      ) : (
        <nav className="flex items-center gap-4 font-semibold">
          <Link href="/user/login">
            <button className={BUTTON_CLASS}>로그인</button>
          </Link>
          <Link href="/user/signup">
            <button className={BUTTON_CLASS}>회원가입</button>
          </Link>
        </nav>
      )}
      
    </header>
  );
};

export default HeaderComponent;
