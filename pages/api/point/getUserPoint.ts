import axios from "axios";

export const getUserPoint = async () => {
  try {
    const response = await axios.get(
      `http://3.39.195.241:8080/api/post/mypost`,
      {headers : {Authorization : localStorage.getItem('authorization')}, withCredentials: true},
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};