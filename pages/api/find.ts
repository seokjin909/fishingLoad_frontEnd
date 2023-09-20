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
  const response = await axios.post(
    "http://3.39.195.241:8080/api/user/findID",
    data,
  );
  return response;
};

export const findPw = async (data: IFindPwData) => {
  const response = await axios.post(
    "http://3.39.195.241:8080/api/user/findPW",
    data,
  );
  return response;
};
