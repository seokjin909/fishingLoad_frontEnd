"use client";
import axios from "axios";

interface IChangePw {
  password: string;
}

export const changePw = async (data: IChangePw) => {
  let token: any = "";
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/change`,
      data,
      {
        headers: {
          temporary_Authorization: localStorage.getItem("authorization"),
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
    if (error.headers?.authorization) {
      console.log("토큰 만료 및 API요청 에러");
      token = error.headers.authorization;
    } else {
      token = localStorage.getItem("authorization");
    }
    return error.response.data.message;
  } finally {
    localStorage.setItem("authorization", token);
  }
};
