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
      "http://3.39.195.241:8080/api/user/findID",
      data,
    );
    if (response.status === 200) {
      return response;
    } else {
      console.error("API 요청 실패");
    }
  } catch (error: any) {
    console.log(error);
    return error.response.data.message;
  }
};

export const findPw = async (data: IFindPwData) => {
  try {
    const response = await axios.post(
      "http://3.39.195.241:8080/api/user/findPW",
      data,
    );
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};
