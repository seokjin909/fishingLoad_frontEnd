"use client";
import axios from "axios";
interface IData {
  userId: string;
  password: string;
}
// const service = axios.create

export const loginFetcher = async (data: IData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/login`,
      data,
      {
        withCredentials: true,
      },
    );
    console.log(response);
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};
