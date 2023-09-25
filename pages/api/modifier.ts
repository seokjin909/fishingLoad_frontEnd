/* eslint-disable */
"use client";
import axios from "axios";
interface IModifier {
  password: string;
  nickname: string;
  email: string;
}
// 회원정보 수정
export const modifierUser = async (data: IModifier) => {
  let token: any = "";
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/account`,
      data,
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
    return error.response.data.message;
  } finally {
    localStorage.setItem("authorization", token);
  }
};
