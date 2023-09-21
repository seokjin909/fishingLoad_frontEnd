import axios from "axios";

export const deleteComment = async (id: number) => {
  try {
      const response = await axios.delete(
        `http://3.39.195.241:8080/api/comment/${id}`,
        {headers : {Authorization : localStorage.getItem('authorization')}, withCredentials: true},
      );
      console.log(response);
      return response;
  } catch (error) {
    console.error(error);
  }
};
