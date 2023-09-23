import axios from "axios";

export const deleteComment = async (id: number) => {
  try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comment/${id}`,
        {headers : {Authorization : localStorage.getItem('authorization')}, withCredentials: true},
      );
      return response;
  } catch (error) {
    console.error(error);
  }
};
