"use client";

import { useRouter } from "next/router";
import { useState } from "react";
import { checkUserId, userSignUp } from "../api/signup";
import {
  isValidEmail,
  isValidNickname,
  isValidPassword,
  isValidUserId,
} from "./../api/validation";
import Link from "next/link";

export default function SignUp() {
  const [userId, setUserId] = useState("");
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [userVerifyPassword, setUserVerifyPassword] = useState("");
  const [email, setEmail] = useState("");
  const admin = false;
  const adminToken = "A1234";
  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.currentTarget;
    if (name === "userId") {
      setUserId(event.currentTarget.value);
      validateUserId(userId);
    }
    if (name === "userNickName") {
      setNickName(event.currentTarget.value);
      validateNickname(nickname);
    }
    if (name === "userPassword") {
      setPassword(event.currentTarget.value);
    }
    if (name === "userVerifyPassword") {
      setUserVerifyPassword(event.currentTarget.value);
    }
    if (name === "userEmail") {
      setEmail(event.currentTarget.value);
      validateEmail(email);
    }
  };

  const validateUserId = (userId: string) => {
    if (!isValidUserId(userId)) {
      setUserIdError("4-15자리, 대소문자와 숫자만 허용됩니다.");
    } else {
      setUserIdError("");
    }
  };
  const validatePassword = (password: string) => {
    if (!isValidPassword(password)) {
      setPasswordError(
        "8-20자리, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
      );
    } else {
      setPasswordError("");
    }
  };

  const validateNickname = (nickname: string) => {
    if (!isValidNickname(nickname)) {
      setNicknameError("2-10자리, 특수문자는 사용할 수 없습니다.");
    } else {
      setNicknameError("");
    }
  };

  const validateEmail = (email: string) => {
    if (!isValidEmail(email)) {
      setEmailError("이메일 형식을 확인하세요");
    } else {
      setEmailError("");
    }
  };
  const checkBtn = async () => {
    const response = await checkUserId({ userId, email });
    if (response.status === 200) {
      alert(response.data.message);
      return true;
    } else {
      alert(response);
      setUserId("");
      return false;
    }
  };

  const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // 아이디가 비어있거나 유효성 검사 오류가 있는지 확인해서 중복확인 시도토록.
    const value = await checkBtn();
    if (value === false) {
      alert("아이디 중복확인을 해주세요");
      return;
    } else {
      // 모든 필드에 대한 유효성 검사를 추가
      validateUserId(userId);
      validatePassword(password);
      validateNickname(nickname);
      validateEmail(email);

      // 모든 필드가 유효한지 확인
      if (userIdError || passwordError || nicknameError || emailError) {
        alert("입력값을 다시 확인하세요");
        return; // 하나라도 유효하지 않으면 제출을 중지합니다.
      } else if (userVerifyPassword !== password) {
        alert("비밀번호를 확인하세요");
        return;
      } else {
        const response = await userSignUp({
          userId,
          password,
          nickname,
          email,
          admin,
          adminToken,
        });
        if (response.status === 200) {
          alert(response.data.message);
          router.push("/user/login");
        } else {
          alert(response);
        }
      }
    }
  };

  return (
    <div className="mb-[34px] clear-both max-w-[1200px] mx-auto">
      <div className="mb-[40px] w-full">
        <div className="w-full mt-[65px]">
          <h2 className="text-left text-white pt-[12px] pb-[10px] pl-[5%] font-semibold text-[1.25em] bg-[rgb(67,74,85)]">
            회원가입
          </h2>
        </div>
        {/* 본문 내용 시작 */}
        <form>
          <div>
            <h4 className="mb-[10px] text-[16px] font-semibold mt-[30px]">
              회원정보 입력
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
                      아이디
                    </th>
                    <td className="border-t-0 bg-[#fff] border-l border-l-[#eee] py-[10px] px-[15px] text-left">
                      <input
                        className="h-[32px] px-[5px] leading-[18px] text-[#696F74] align-middle bg-[fefefe] border border-[#e2e2e2] rounded-[3px] shadow-sm"
                        type="text"
                        value={userId}
                        onChange={onChange}
                        name="userId"
                        required
                      />
                      &nbsp; &nbsp; &nbsp;
                      <span className="text-[10px] text-red-500 font-semibold">
                        {userIdError}
                      </span>
                      <button
                        className="py-[5px] px-[10px] min-w-[50px] text-[12px] font-semibold border border-gray-300 bg-[#aaa] bg-opacity-30 rounded-md mt-[5px] ml-[10px]"
                        type="button"
                        onClick={checkBtn}
                      >
                        중복확인
                      </button>
                    </td>
                  </tr>

                  <tr className="table-row align-middle border-inherit">
                    <th className="bg-[#f9f9f9] pl-[30px] text-left py-[13px] px-[15px] align-top font-semibold text-[#666]">
                      닉네임
                    </th>
                    <td className="border-t-0 bg-[#fff] border-l border-l-[#eee] py-[10px] px-[15px] text-left">
                      <input
                        className="h-[32px] px-[5px] leading-[18px] text-[#696F74] align-middle bg-[fefefe] border border-[#e2e2e2] rounded-[3px] shadow-sm"
                        type="text"
                        value={nickname}
                        onChange={onChange}
                        name="userNickName"
                        required
                      />
                      &nbsp; &nbsp; &nbsp;
                      <span className="text-[10px] text-red-500 font-semibold">
                        {nicknameError}
                      </span>
                    </td>
                  </tr>
                  <tr className="table-row align-middle border-inherit">
                    <th className="bg-[#f9f9f9] pl-[30px] text-left py-[13px] px-[15px] align-top font-semibold text-[#666]">
                      비밀번호
                    </th>
                    <td className="border-t-0 bg-[#fff] border-l border-l-[#eee] py-[10px] px-[15px] text-left">
                      <input
                        className="h-[32px] px-[5px] leading-[18px] text-[#696F74] align-middle bg-[fefefe] border border-[#e2e2e2] rounded-[3px] shadow-sm"
                        type="password"
                        value={password}
                        onChange={onChange}
                        name="userPassword"
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
                      비밀번호 확인
                    </th>
                    <td className="border-t-0 bg-[#fff] border-l border-l-[#eee] py-[10px] px-[15px] text-left">
                      <input
                        className="h-[32px] px-[5px] leading-[18px] text-[#696F74] align-middle bg-[fefefe] border border-[#e2e2e2] rounded-[3px] shadow-sm"
                        type="password"
                        value={userVerifyPassword}
                        onChange={onChange}
                        name="userVerifyPassword"
                        required
                      />
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
                        value={email}
                        onChange={onChange}
                        name="userEmail"
                        required
                      />
                      &nbsp; &nbsp; &nbsp;
                      <span className="text-[10px] text-red-500 font-semibold">
                        {emailError}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-[30px] text-center space-x-3">
              <button
                onClick={onSubmit}
                className="text-white inline-block box-border p-[10px] min-w-[150px] text-[14px] rounded-sm border bg-[rgb(119,142,206)] border-[rgb(119,142,206)]"
              >
                가입하기
              </button>
              <Link href="/user/login">
                <button className="p-[10px] min-w-[150px] text-[14px] text-[#fff] align-middle bg-[#aaa] rounded-sm">
                  취소
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
