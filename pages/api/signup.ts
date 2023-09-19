'use client'
import axios from "axios";
interface IData {
  userId: string;
  password: string;
  nickname: string;
  email: string;
  admin: boolean;
  adminToken: string;
}
interface ICheck {
  email: string;
  userId: string;
}

export const checkUserId = async (data: ICheck) => {
  console.log(data);
  const response = await axios.post(
    "http://3.39.195.241:8080/api/user/userIdCheck",
    data,
    { withCredentials: true },
  );
  return response;
};

export const userSignUp = async (data: IData) => {
  const response = await axios.post(
    "http://3.39.195.241:8080/api/user/signup",
    data,
    { withCredentials: true },
  );
  return response;
};
