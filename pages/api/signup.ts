"use client";
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
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/userIdCheck`,
      data,
      { withCredentials: true },
    );
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};

export const userSignUp = async (data: IData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/signup`,
    data,
    { withCredentials: true },
  );
  return response;
};
