'use client'
import axios from "axios";
interface IData {
  userId: string;
  password: string;
}
// const service = axios.create

export const loginFetcher = async (data: IData) => {
  const response = await axios.post(
    "http://3.39.195.241:8080/api/user/login",
    data,
    {
      withCredentials: true,
    },
  );

  return response;
};
