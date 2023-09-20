"use client";
import axios from "axios";

interface IChangePw {
  password: string;
}

export const changePw = async (data: IChangePw) => {
  const response = await axios.put(
    "http://3.39.195.241:8080/api/user/change",
    data,
    {
      headers: {
        temporary_Authorization: localStorage.getItem("authorization"),
      },
    },
  );
  return response;
};
