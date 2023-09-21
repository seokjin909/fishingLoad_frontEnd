/* eslint-disable */
"use client";

import { useEffect, useState } from "react";
import { getMyInfo, getMyPage } from "../api/myinfo";
import { resign } from "../api/myinfo";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MyInfo() {
  const [data, setData]: any = useState();
  const [page, setPage]: any = useState([]);
  const router = useRouter();

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
    alert("이용해주셔서 감사합니다.");
    router.push("/user/login");
  };

  // 로그아웃
  const logoutBtn = () => {
    localStorage.removeItem("authorization");
    localStorage.removeItem("authorization_refresh");
    // alert("로그인 페이지로 이동합니다");
    router.push("/user/login");
  };

  return (
    <>
      <div className="mb-[34px] clear-both max-w-[1200px] mx-auto">
        <div className="mb-[40px] w-full">
          <div className="w-full mt-[65px]">
            <h2 className="text-left text-white pt-[12px] pb-[10px] pl-[5%] font-semibold text-[1.25em] bg-[rgb(67,74,85)]">
              마이페이지
            </h2>
          </div>
          <div>
            <div className="flex items-center justify-end">
              <h4 className="mb-[10px] text-[16px] font-semibold mt-[30px]">
                환영합니다.&nbsp;&nbsp;{data?.userId}님
              </h4>
              {data?.userId === undefined ? (
                <button
                  onClick={logoutBtn}
                  className="py-[5px] h-8 px-[10px] min-w-[50px] text-[12px] font-semibold border border-gray-300 bg-[#aaa] bg-opacity-30 rounded-md mt-[5px] ml-[10px]"
                >
                  로그인
                </button>
              ) : (
                <button
                  onClick={logoutBtn}
                  className="py-[5px] px-[10px] min-w-[50px] text-[12px] font-semibold border border-gray-300 bg-[#aaa] bg-opacity-30 rounded-md mt-[5px] ml-[10px] shadow-md hover:bg-red-500 active:text-red-500 transition-all"
                >
                  로그아웃
                </button>
              )}
            </div>
            <div className="flex items-center justify-center mb-[50px]">
              <img className="w-20 bg-slate-200 h-20 text-center shadow-lg rounded-xl mt-6" />
              <div className="flex items-center justify-center font-semibold text-lg mt-6 ml-4 space-x-5">
                <span className="align-middle">{data?.nickname}&nbsp;님</span>
                <Link href="/user/modifier">
                  <button className="py-[5px] h-8 px-[10px] flex items-center min-w-[50px] text-[12px] font-semibold border border-gray-300 bg-[#aaa] bg-opacity-30 rounded-md mt-[5px] ml-[10px] shadow-md hover:bg-[#778ECE] active:bg-[#778ECE] transition-all">
                    회원수정
                  </button>
                </Link>
                <button
                  onClick={resignBtn}
                  className="py-[5px] h-8 px-[10px] min-w-[50px] text-[12px] flex items-center justify-center font-semibold border border-gray-300 bg-[#aaa] bg-opacity-30 rounded-md mt-[5px] ml-[10px] hover:bg-red-500 active:bg-red-500 shadow-md transition-all"
                >
                  탈퇴
                </button>
              </div>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 border-t-2 border-black">
                <thead className="text-xs text-black uppercase bg-gray-100 border-b">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      번호
                    </th>
                    <th scope="col" className="px-6 py-3">
                      제목
                    </th>
                    <th scope="col" className="px-6 py-3">
                      작성자
                    </th>
                    <th scope="col" className="px-6 py-3">
                      등록일
                    </th>
                    <th scope="col" className="px-6 py-3">
                      좋아요
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {page.map((item: any) => {
                    return (
                      <>
                        <tr className="bg-white border-b">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            key={item.id}
                          >
                            {item.id}
                          </th>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer"
                          >
                            {item.title}
                          </th>
                          <td className="px-6 py-4">{item.accountId}</td>
                          <td className="px-6 py-4">{item.createdTime}</td>
                          <td className="px-6 py-4">{item.postLike}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
// {
//   page.map((item: any) => {
//     return (
//       <div
//         key={item.id}
//         className="flex justify-around px-10 py-4 font-medium text-gray-900 whitespace-nowrap"
//       >
//         <span className="px-6 py-4">{item.title}</span>
//         <span className="px-6 py-4">{item.accountId}</span>
//         <span className="px-6 py-4">{item.createdTime}</span>
//         <span className="px-6 py-4">{item.postLike}</span>
//       </div>
//     );
//   });
// }

// {page.map((item: any) => {
//   return (
//     <div
//       key={item.id}
//       className="flex justify-around px-10 py-4 font-medium text-gray-900 whitespace-nowrap"
//     >
//       <span className="px-6 py-4">{item.title}</span>
//       <span className="px-6 py-4">{item.locationdate}</span>
//       <span className="px-6 py-4">{item.createdTime}</span>
//     </div>
//   );
// })}
