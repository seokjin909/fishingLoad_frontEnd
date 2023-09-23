"use client";
import axios from "axios";

interface IChangePw {
  password: string;
}

export const changePw = async (data: IChangePw) => {
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
    return response;
  } catch (error: any) {
    return error.response.data.message;
  }
};
