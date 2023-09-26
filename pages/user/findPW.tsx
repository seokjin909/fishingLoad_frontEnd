/* eslint-disable */
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { findPw } from "../api/find";
import { useRouter } from "next/router";
import HeaderComponent from "@/components/common/Header";
import FooterComponent from "@/components/common/Footer";
import { toast } from "react-toastify";

export default function findPassword() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.currentTarget;

    name === "userId"
      ? setUserId(event.currentTarget.value)
      : setEmail(event.currentTarget.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await findPw({ email, userId });

    // 비밀번호 변경창으로
    if (response.status === 200) {
      const accessToken = response.headers.temporary_authorization;
      localStorage.setItem("authorization", accessToken);
      toast.success(response.data.message);
      router.push("/user/changePW");
    } else {
      toast.error(response);
      setUserId("");
      setEmail("");
    }
  };
  return (
    <>
      <HeaderComponent />
      <div className="mb-[34px] clear-both max-w-[1200px] mx-auto">
        <div className="mb-[40px] mt-[70px] text-center">
          <form onSubmit={onSubmit}>
            <div>
              <div className="mb-[20px]">
                <ul className="table w-full list-none">
                  <li className="pl-[0px] pr-[5px] table-cell align-top list-none">
                    <div className="pt-[5px] pb-[10px] leading-[1.6]">
                      <h5 className="text-[14px] font-semibold text-[#444]">
                        등록 정보로 아이디 찾기
                      </h5>
                      <p className="text-[#444]">
                        회원가입 시 등록한 정보로 찾을 수 있습니다.
                      </p>
                    </div>
                    <div className="table w-full h-[200px] py-[20px] text-center bg-[#f7f7f7]">
                      <div className="table-cell align-middle text-center">
                        <dl className="table mx-auto text-center list-none">
                          <dd className="table-cell pl-[20px] text-left list-none">
                            <table className="border-none border-collapse w-100%">
                              <colgroup className="box-border table-column-group">
                                <col className="w-[50%] table-column"></col>
                                <col className="table-column"></col>
                              </colgroup>
                              <tbody className="box-border table-row-group align-middle border-inherit">
                                <tr>
                                  <th className="pb-[5px] text-left font-normal border-none">
                                    아이디 &nbsp;
                                  </th>
                                  <td className="pb-[8px] border-none">
                                    <input
                                      className="w-[155px] h-[32px] px-[5px] leading-[3px] text-[#696F74] align-middle bg-[#fefefe] border border-[#e2e2e2] rounded-[3px] shadow-md"
                                      type="text"
                                      placeholder="아이디를 입력하세요"
                                      name="userId"
                                      value={userId}
                                      onChange={onChange}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <th className="pb-[5px] text-left font-normal border-none">
                                    이메일 &nbsp;
                                  </th>
                                  <td className="pb-[8px] border-none">
                                    <input
                                      className="w-[155px] h-[32px] px-[5px] leading-[3px] text-[#696F74] align-middle bg-[#fefefe] border border-[#e2e2e2] rounded-[3px] shadow-md"
                                      type="text"
                                      name="email"
                                      placeholder="이메일을 입력하세요"
                                      value={email}
                                      onChange={onChange}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </dd>
                          <dd className="table-cell pl-[20px] text-left">
                            <button className="min-w-[80px] py-[4px] px-[10px] text-[14px] border border-[#58668d] bg-[#6f7b9c] text-[#fff]">
                              찾기
                            </button>
                          </dd>
                        </dl>
                        <div className="mt-6">
                          <Link href="/user/login">
                            <span className="font-bold">로그인 페이지로</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
        <FooterComponent />
      </div>
    </>
  );
}
