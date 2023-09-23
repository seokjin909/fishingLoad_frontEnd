/* eslint-disable */
"use client";
import axios from "axios";

// 마이페이지
export const getMyPage = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/mypage?page=1&size=5&sortBy=title&isAsc=true`,
    {
      headers: {
        Authorization: localStorage.getItem("authorization"),
        Authorization_Refresh: localStorage.getItem("authorization_refresh"),
      },
    },
  );
  try {
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 회원 탈퇴
export const resign = async () => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/resign`,
    {
      headers: {
        Authorization: localStorage.getItem("authorization"),
        Authorization_Refresh: localStorage.getItem("authorization_refresh"),
      },
    },
  );
  return response;
};

// 게시글 정보 불러오기
export const getMyInfo = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/myinfo`,
    {
      headers: {
        Authorization: localStorage.getItem("authorization"),
        Authorization_Refresh: localStorage.getItem("authorization_refresh"),
      },
    },
  );
  try {
    return response;
  } catch (error) {
    console.log(error);
  }
};
