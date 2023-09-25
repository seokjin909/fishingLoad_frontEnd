"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GiFishingPole } from "react-icons/gi";
import { BiUserCircle } from "react-icons/bi";
import Image from "next/image";

const BUTTON_CLASS =
  "transition-all cursor-pointer hover:scale-105 mx-1 hover:text-blue-300";
const HeaderComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem("authorization");
    console.log(token);
    setIsLoggedIn(!!token);
  }, []);

  // 로그아웃 함수
  const handleLogout = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("authorization_refresh");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <header className="boder-b-[1px] border-b-[#c1c1c1] border-solid h-[130px]">
      <div className="max-w-[1200px] mx-auto h-[130px]">
        <div className="max-w-[1200px] mx-auto text-right pt-[10px]">
          {isLoggedIn ? (
            <div className="flex justify-end items-center">
              <Link href="/user/myinfo" className="inline-block">
                <BiUserCircle className="text-[#878787] text-2xl" />
              </Link>
              <button
                onClick={handleLogout}
                className="ml-[15px] text-[#878787]"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex justify-end items-center">
              <Link href="/user/login" className="inline-block">
                <span className="font-[13px] text-[#878787] ml-[20px]">
                  로그인
                </span>
              </Link>
              <Link href="/user/signup" className="inline-block">
                <span className="font-[13px] text-[#878787] ml-[20px]">
                  회원가입
                </span>
              </Link>
            </div>
          )}
        </div>
        <h1 className="mt-[40px] mx-auto mb-[25px] w-[250px]">
          <Link href="/" className="flex items-center justify-center h-[52px]">
            {/* <span className="text-3xl">
              FISHING LOAD
              <GiFishingPole />
            </span> */}
            <Image src="/logo/fish.png" className="mt-[20px]" width={200} height={200} alt="logo"/>
          </Link>
        </h1>
        <div className="max-w-[1200px] mx-auto transition-all">
          <div className="w-full h-auto transition-all">
            <ul className="z-[9999] list-none inline-block">
              <li className="inline-block list-none">
                <Link
                  href="/"
                  className="py-[11px] px-[15px] block text-[1.1em] text-[#878787]"
                >
                  전국 포인트
                </Link>
              </li>
              <li className="inline-block list-none">
                <a
                  className="py-[11px] px-[15px] block text-[1.1em] text-[#878787] cursor-pointer"
                  onClick={() => {
                    if (!isLoggedIn) {
                      alert("로그인이 필요한 기능입니다!");
                      router.replace("/user/login");
                    } else {
                      router.push("/point/mypoint");
                    }
                  }}
                >
                  나만의 포인트
                </a>
              </li>
              <li className="inline-block list-none">
                <Link
                  href="/community"
                  className="py-[11px] px-[15px] block text-[1.1em] text-[#878787]"
                >
                  커뮤니티
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;