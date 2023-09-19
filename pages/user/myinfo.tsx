/* eslint-disable */
"use client";

import { useEffect, useState } from "react";
import { getMyInfo, getMyPage, modifierUser } from "../api/myinfo";
import { resign } from "../api/myinfo";

export default function MyInfo() {
  const [data, setData]: any = useState();
  const [page, setPage]: any = useState([]);

  // 게시글, 포인트 등록 정보
  const fetchInfo = async () => {
    try {
      const response = await getMyInfo();
      setData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPage = async () => {
    try {
      const response = await getMyPage();
      setPage(response?.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchInfo();
    fetchPage();
  }, []);

  // 회원 탈퇴
  const resignBtn = async () => {
    const response = await resign();
    alert(response.data.message);
  };

  // 회원정보 수정
  const modifierBtn = async () => {
    const response = await modifierUser(data);
    console.log(response);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-start w-screen h-screen mt-6">
        <div className="w-40 bg-slate-200 h-40 text-center shadow-lg rounded-xl">
          로고
        </div>
        <div className="flex justify-around items-center font-semibold mt-10 w-6/12 text-lg">
          <span className="transition-all cursor-pointer hover:scale-105 mx-1 hover:text-blue-300">
            전국 포인트
          </span>
          <span className="transition-all cursor-pointer hover:scale-105 mx-1 hover:text-blue-300">
            나만의 포인트
          </span>
          <span className="transition-all cursor-pointer hover:scale-105 mx-1 hover:text-blue-300">
            커뮤니티
          </span>
          <span className="transition-all hover:scale-105 mx-1 hover:text-blue-300">
            환영합니다.&nbsp;&nbsp;{data?.userId}님
          </span>
          <button className="text-xl w-2/12 font-bold shadow-md h-10 bg-orange-300 rounded-md hover:bg-orange-600 hover:scale-110 active:bg-yellow-400 transition-all">
            로그아웃
          </button>
        </div>
        <div className="flex items-center justify-center">
          <img className="w-20 bg-slate-200 h-20 text-center shadow-lg rounded-xl mt-6" />
          <div className="font-semibold text-lg mt-6 ml-4 space-x-5">
            <span>{data?.nickname}&nbsp;님</span>
            <button
              onClick={modifierBtn}
              className="text-lg w-32 font-bold shadow-md h-10 bg-orange-300 rounded-md hover:bg-orange-600 hover:scale-110 active:bg-yellow-400 transition-all"
            >
              회원수정
            </button>
            <button
              onClick={resignBtn}
              className="text-lg w-20 font-bold shadow-md h-10 bg-red-400 rounded-md hover:bg-red-600 hover:scale-110 active:bg-red-800 transition-all"
            >
              탈퇴
            </button>
          </div>
        </div>
        <div className="mt-20 w-11/12">
          <div className="container mx-auto flex justify-center items-center flex-col">
            <div className="flex justify-around w-8/12 border border-gray-300 shadow-lg">
              <span>제목</span>
              <span>작성자</span>
              <span>등록일</span>
              <span>좋아요</span>
            </div>
            <div className="shadow-lg w-8/12">
              {page.map((item: any) => {
                return (
                  <div
                    key={item.id}
                    className="flex justify-around px-10 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <span className="px-6 py-4">{item.contents}</span>
                    <span className="px-6 py-4">{item.accountId}</span>
                    <span className="px-6 py-4">{item.createdTime}</span>
                    <span className="px-6 py-4">{item.postLike}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="container mx-auto flex justify-center items-center flex-col">
              <div className="mt-10 flex justify-around w-8/12 border border-gray-300 shadow-lg">
                <span>이름</span>
                <span>위치</span>
                <span>등록일</span>
              </div>
              <div className="shadow-lg w-8/12">
                {page.map((item: any) => {
                  return (
                    <div
                      key={item.id}
                      className="flex justify-around px-10 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <span className="px-6 py-4">{item.title}</span>
                      <span className="px-6 py-4">{item.locationdate}</span>
                      <span className="px-6 py-4">{item.createdTime}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
