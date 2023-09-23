import axios from "axios";

export const deletePostAPI = async (id: number) => {
  try {
      const response = await axios.delete(
        `http://3.39.195.241:8080/api/post/${id}`,
        {headers : {Authorization : localStorage.getItem('authorization')}, withCredentials: true},
      );
      return response;
  } catch (error) {
    console.error(error);
  }
};
