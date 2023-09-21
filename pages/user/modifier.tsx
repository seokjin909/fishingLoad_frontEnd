/* eslint-disable */
"use client";

import { useState } from "react";
import { modifierUser } from "../api/modifier";
import { useRouter } from "next/router";
import {
  isValidEmail,
  isValidNickname,
  isValidPassword,
} from "../api/validation";

export default function Modifier() {
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
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

  const validatePassword = (password: string) => {
    if (!isValidPassword(password)) {
      setPasswordError(
        "8-20자리, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };
  const validateEmail = (email: string) => {
    if (!isValidEmail(email)) {
      setEmailError("이메일 형식을 확인하세요");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };
  const validateNickname = (nickname: string) => {
    if (!isValidNickname(nickname)) {
      setNicknameError("2-10자리, 특수문자는 사용할 수 없습니다.");
      return false;
    } else {
      setNicknameError("");
      return true;
    }
  };

  // 회원정보 수정
  const modifierBtn = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const valPassword = validatePassword(password);
    const valNickname = validateNickname(nickname);
    const valEmail = validateEmail(email);
    const response = await modifierUser({ password, nickname, email });
    if (!valPassword || !valNickname || !valEmail) {
      alert("입력값을 다시 확인하세요");
      return;
    } else {
      if (response.status === 200) {
        alert("회원정보 수정 완료");
        router.push("/user/myinfo");
      } else {
        alert("동일한 닉네임이 존재합니다.");
      }
    }
  };
  return (
    <>
      <div className="mb-[34px] clear-both max-w-[1200px] mx-auto">
        <div className="mb-[40px] w-full">
          <div className="w-full mt-[65px]">
            <h2 className="text-left text-white pt-[12px] pb-[10px] pl-[5%] font-semibold text-[1.25em] bg-[rgb(67,74,85)]">
              회원정보 수정
            </h2>
          </div>
          {/* 본문 내용 시작 */}
          <form>
            <div>
              <h4 className="mb-[10px] text-[16px] font-semibold mt-[30px]">
                회원정보 수정
              </h4>
              <div className="mt-[10px] mx-auto mb-[15px]">
                <table className="w-full border-separate border-b border-b-[#aaa] border-t border-t-[#666]">
                  <colgroup className="table-column-group">
                    <col className="table-column w-[20%]"></col>
                    <col className="table-column"></col>
                  </colgroup>
                  <tbody className="table-row-group align-middle border-inherit">
                    <tr className="table-row align-middle border-inherit">
                      <th className="bg-[#f9f9f9] pl-[30px] text-left py-[13px] px-[15px] align-top font-semibold text-[#666]">
                        비밀번호
                      </th>
                      <td className="border-t-0 bg-[#fff] border-l border-l-[#eee] py-[10px] px-[15px] text-left">
                        <input
                          className="h-[32px] px-[5px] leading-[18px] text-[#696F74] align-middle bg-[fefefe] border border-[#e2e2e2] rounded-[3px] shadow-sm"
                          type="password"
                          onChange={onPassword}
                          value={password}
                          required
                        />
                        &nbsp; &nbsp; &nbsp;
                        <span className="text-[10px] text-red-500 font-semibold">
                          {passwordError}
                        </span>
                      </td>
                    </tr>
                    <tr className="table-row align-middle border-inherit">
                      <th className="bg-[#f9f9f9] pl-[30px] text-left py-[13px] px-[15px] align-top font-semibold text-[#666]">
                        이메일
                      </th>
                      <td className="border-t-0 bg-[#fff] border-l border-l-[#eee] py-[10px] px-[15px] text-left">
                        <input
                          className="h-[32px] px-[5px] leading-[18px] text-[#696F74] align-middle bg-[fefefe] border border-[#e2e2e2] rounded-[3px] shadow-sm"
                          type="email"
                          onChange={onEmail}
                          value={email}
                        />
                        &nbsp; &nbsp; &nbsp;
                        <span className="text-[10px] text-red-500 font-semibold">
                          {emailError}
                        </span>
                      </td>
                    </tr>
                    <tr className="table-row align-middle border-inherit">
                      <th className="bg-[#f9f9f9] pl-[30px] text-left py-[13px] px-[15px] align-top font-semibold text-[#666]">
                        닉네임
                      </th>
                      <td className="border-t-0 bg-[#fff] border-l border-l-[#eee] py-[10px] px-[15px] text-left">
                        <input
                          className="h-[32px] px-[5px] leading-[18px] text-[#696F74] align-middle bg-[fefefe] border border-[#e2e2e2] rounded-[3px] shadow-sm"
                          type="nickname"
                          onChange={onNickname}
                          value={nickname}
                          required
                        />
                        &nbsp; &nbsp; &nbsp;
                        <span className="text-[10px] text-red-500 font-semibold">
                          {nicknameError}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-[30px] text-center space-x-3">
                <button
                  onClick={modifierBtn}
                  className="text-white inline-block box-border p-[10px] min-w-[150px] text-[14px] rounded-sm border bg-[rgb(119,142,206)] border-[rgb(119,142,206)]"
                >
                  수정하기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// <div>
//   <form>
//     비밀번호
//     <input type="password" onChange={onPassword} value={password} />
//     닉네임
//     <input type="nickname" onChange={onNickname} value={nickname} />
//     이메일
//     <input type="email" onChange={onEmail} value={email} />
//     <button onClick={modifierBtn}>수정하기</button>
//   </form>
// </div>
