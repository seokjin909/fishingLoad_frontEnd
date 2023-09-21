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
  try {
    const response = await axios.put(
      `http://3.39.195.241:8080/api/account`,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("authorization"),
          Authorization_Refresh: localStorage.getItem("authorization_refresh"),
        },
      },
    );
    return response;
  } catch (error: any) {
    console.log(error);
    return error.response.data.message;
  }
};
