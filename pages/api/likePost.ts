import axios from "axios";

export const likePost = async (id: number) => {
    console.log(id);
  try {
      const response = await axios.put(
        `http://3.39.195.241:8080/api/post/like/${id}`,
        { headers : { Authorization : localStorage.getItem('authorization')}, withCredentials: true},
      );
      console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};