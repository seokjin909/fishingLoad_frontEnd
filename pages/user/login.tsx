"use client";

import Link from "next/link";
import { useState } from "react";
import { loginFetcher } from "../api/login";
import { useRouter } from "next/router";
// import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setUserPassword] = useState("");
  const router = useRouter();
  // const {login}:any = useAuth();

  const onIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.currentTarget.value);
  };
  const onPwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPassword(event.currentTarget.value);
  };
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await loginFetcher({ userId, password });
    
    if (response?.status === 200) {
      const accessToken = response.headers.authorization;
      const refreshToken = response.headers.authorization_refresh;
      localStorage.setItem("authorization", accessToken);
      localStorage.setItem("authorization_refresh", refreshToken);
      alert("로그인 성공");
      setUserId("");
      setUserPassword("");
      // login(accessToken, refreshToken);
      router.push("/");
    } else {
      alert(response);
      setUserId("");
      setUserPassword("");
    }
  };

  return (
    <div>
      <div className="mb-[34px] clear-both max-w-[1200px] my-0 mx-auto pt-0">
        <div className="mb-[40px] mt-[70px] text-center">
          {/* 게시판 영역 시작 */}
          <div className="relative mb-[50px] align-middle">
            <div>
              <h2 className="text-left text-white pt-[12px] pb-[10px] pl-[5%] font-semibold text-[1.25em] bg-slate-700">
                로그인
              </h2>
            </div>
            <form onSubmit={onSubmit}>
              <div className="border-solid border-t-2 border-gray-700">
                <ul className="max-w-[410px] mt-[100px] mr-auto mb-[50px] ml-auto">
                  <li className="w-[410px] h-[50px] text-[1.25em] text-left mb-[10px] leading-[50px]">
                    <input
                      className="border border-solid text-[12px] border-gray-300 w-[410px] h-[50px] pl-[20px] leading-[18px] align-middle rounded-[3px] shadow-slate-200 shadow-md"
                      type="text"
                      value={userId}
                      placeholder="아이디"
                      onChange={onIdChange}
                    />
                  </li>
                  <li>
                    <input
                      className="border border-solid text-[12px] border-gray-300 w-[410px] h-[50px] pl-[20px] leading-[18px] align-middle rounded-[3px] shadow-slate-200 shadow-md"
                      type="password"
                      value={password}
                      placeholder="비밀번호"
                      onChange={onPwChange}
                    />
                  </li>
                  <div className="box-border">
                    <input
                      type="submit"
                      value="로그인"
                      className="mt-[10px] px-[10px] py-[12px] min-w-[150px] text-[14px] border bg-[rgb(119,142,206)] border-[rgb(119,142,206)] inline-block box-border cursor-pointer text-white text-center align-middle transition-all"
                    />
                  </div>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <li className="inline-block float-left px-[20px] text-[1.0em] text-center cursor-pointer mb-[100px] list-none">
                  <Link href="/user/findPW">비밀번호 찾기</Link>
                  &nbsp; | &nbsp; <Link href="/user/findID">아이디 찾기</Link>
                  &nbsp; | &nbsp; <Link href="/user/signup">회원가입</Link>
                  &nbsp; | &nbsp; <Link href="/user/myinfo">마이페이지로</Link>
                </li>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
