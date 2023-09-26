/* eslint-disable */
"use client";
import axios from "axios";

// 마이페이지
export const getMyPage = async () => {
  let token: any = "";
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/mypage?page=1&size=5&sortBy=title&isAsc=true`,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Authorization_Refresh: localStorage.getItem("authorization_refresh"),
        },
      },
    );
    if (response.headers.authorization) {
      console.log("Access 토큰 재발급 중");
      token = response.headers.authorization;
    } else {
      console.log("유효한 토큰임!");
      token = localStorage.getItem("authorization");
    }
    return response;
  } catch (error: any) {
    console.log(error);
    if (error.headers?.authorization) {
      console.log("토큰 만료 및 API요청 에러");
      token = error.headers.authorization;
    }
  } finally {
    localStorage.setItem("authorization", token);
  }
};

// 회원 탈퇴
export const resign = async () => {
  let token: any = "";
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/resign`,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Authorization_Refresh: localStorage.getItem("authorization_refresh"),
        },
      },
    );
    if (response.headers.authorization) {
      console.log("Access 토큰 재발급 중");
      token = response.headers.authorization;
    } else {
      console.log("유효한 토큰임!");
      token = localStorage.getItem("authorization");
    }
    return response;
  } catch (error: any) {
    console.log(error);
    if (error.headers?.authorization) {
      console.log("토큰 만료 및 API요청 에러");
      token = error.headers.authorization;
    } else {
      token = localStorage.getItem("authorization");
    }
  } finally {
    localStorage.setItem("authorization", token);
  }
};

// 게시글 정보 불러오기
export const getMyInfo = async () => {
  let token: any = "";
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account/myinfo`,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Authorization_Refresh: localStorage.getItem("authorization_refresh"),
        },
      },
    );
    if (response.headers.authorization) {
      console.log("Access 토큰 재발급 중");
      token = response.headers.authorization;
    } else {
      console.log("유효한 토큰임!");
      token = localStorage.getItem("authorization");
    }
    return response;
  } catch (error: any) {
    console.log(error);
    if (error.headers?.authorization) {
      console.log("토큰 만료 및 API요청 에러");
      token = error.headers.authorization;
    } else {
      token = localStorage.getItem("authorization");
    }
  } finally {
    localStorage.setItem("authorization", token);
  }
};
