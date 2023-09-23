import axios from "axios";

export const getUserPoint = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/mypost`,
      {headers : {Authorization : localStorage.getItem('authorization')}, withCredentials: true},
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};