"use client";
import axios from "axios";
interface IFindIdData {
  email: string;
}
interface IFindPwData {
  email: string;
  userId: string;
}

export const findId = async (data: IFindIdData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/findID`,
      data,
    );
    if (response.status === 200) {
      return response;
    } else {
      console.error("API 요청 실패");
    }
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const findPw = async (data: IFindPwData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/findPW`,
      data,
    );
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};
