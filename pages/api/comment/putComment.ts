import axios from "axios";

export const putComment = async (id: number) => {
  try {
      const response = await axios.put(
        `http://3.39.195.241:8080/api/comment/like/${id}`,
        null,
        {headers : {Authorization : localStorage.getItem('authorization')}},
      );
      return response;
  } catch (error) {
    console.error(error);
  }
};
