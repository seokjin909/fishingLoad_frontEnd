/* eslint-disable */
"use client";

import { useState } from "react";
import { modifierUser, modifierUserProfile } from "../api/modifier";
import { useRouter } from "next/router";
import {
  isValidEmail,
  isValidNickname,
  isValidPassword,
} from "../api/validation";
import HeaderComponent from "@/components/common/Header";
import FooterComponent from "@/components/common/Footer";
import { toast } from "react-toastify";

export default function Modifier() {
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [profileImage, setProfileImage] = useState("");

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

  // 프로필 이미지 추가
  const onChangeImage = (event: any) => {
    setProfileImage(event.target.files[0]);
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
    const formData = new FormData();
    const valPassword = validatePassword(password);
    const valNickname = validateNickname(nickname);
    const valEmail = validateEmail(email);
    formData.append("image", profileImage);

    const response = await modifierUser({ password, nickname, email });
    const result = await modifierUserProfile(formData);
    if (!valPassword || !valNickname || !valEmail) {
      toast.error("입력값을 다시 확인하세요");
      return;
    } else {
      if (response?.status === 200) {
        toast.success("회원정보 수정 완료");
        router.push("/user/myinfo");
      } else {
        toast.warning("중복된 이메일 | 닉네임 입니다.");
        return;
      }
    }
  };
  return (
    <>
      <HeaderComponent />
      <div className="mb-[34px] clear-both max-w-[1200px] mx-auto mt-[90px]">
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
                <div className="border-separate border-b border-b-[#aaa] border-t border-t-[#666]">
                  <div className="flex items-center justify-between py-[13px] px-[15px] font-semibold text-[#666]">
                    <label htmlFor="password" className="w-[20%]">
                      비밀번호
                    </label>
                    <input
                      id="password"
                      className="flex-1 h-[32px] px-[5px] leading-[18px] text-[#696F74] bg-[fefefe] border border-[#e2e2e2] rounded-[3px] shadow-sm"
                      type="password"
                      onChange={onPassword}
                      value={password}
                      required
                    />
                    <span className="text-[10px] text-red-500 font-semibold">
                      {passwordError}
                    </span>
                  </div>
                </div>
                <div className="border-separate border-b border-b-[#aaa]">
                  <div className="flex items-center justify-between py-[13px] px-[15px] font-semibold text-[#666]">
                    <label htmlFor="email" className="w-[20%]">
                      이메일
                    </label>
                    <input
                      id="email"
                      className="flex-1 h-[32px] px-[5px] leading-[18px] text-[#696F74] bg-[fefefe] border border-[#e2e2e2] rounded-[3px] shadow-sm"
                      type="email"
                      onChange={onEmail}
                      value={email}
                    />
                    <span className="text-[10px] text-red-500 font-semibold">
                      {emailError}
                    </span>
                  </div>
                </div>
                <div className="border-separate border-b border-b-[#aaa]">
                  <div className="flex items-center justify-between py-[13px] px-[15px] font-semibold text-[#666]">
                    <label htmlFor="nickname" className="w-[20%]">
                      닉네임
                    </label>
                    <input
                      id="nickname"
                      className="flex-1 h-[32px] px-[5px] leading-[18px] text-[#696F74] bg-[fefefe] border border-[#e2e2e2] rounded-[3px] shadow-sm"
                      type="text"
                      onChange={onNickname}
                      value={nickname}
                      required
                    />
                    <span className="text-[10px] text-red-500 font-semibold">
                      {nicknameError}
                    </span>
                  </div>
                </div>
                <div className="border-separate border-b border-b-[#aaa]">
                  <div className="flex items-center justify-between py-[13px] px-[15px] font-semibold text-[#666]">
                    <label className="w-[20%]">프로필 사진 업로드</label>
                    <div className="flex-1">
                      <label className="flex flex-col items-center justify-center w-full h-40 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200">
                        <span className="font-semibold">클릭하여 업로드</span>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG 또는 GIF (최대 800x400px)
                        </p>
                        <input
                          onChange={onChangeImage}
                          id="dropzone-file"
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <div>미리보기</div>
                </div>
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
        <FooterComponent />
      </div>
    </>
  );
}
