import axios from "axios";

export const updatePostAPI = async (id: number, data:any) => {
  try {
      const response = await axios.put(
        `http://3.39.195.241:8080/api/post/${id}`,
        data,
        {headers : {Authorization : localStorage.getItem('authorization')}, withCredentials: true},
      );
      return response;
  } catch (error) {
    console.error(error);
  }
};
