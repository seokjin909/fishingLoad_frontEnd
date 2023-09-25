import axios from "axios";

export const updatePostAPI = async (id: number, data:any) => {
  try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post/${id}`,
        data,
        {headers : {Authorization : localStorage.getItem('authorization')}, withCredentials: true},
      );
      return response;
  } catch (error) {
    console.error(error);
  }
};
