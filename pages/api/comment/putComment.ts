import axios from "axios";

export const putComment = async (id: number) => {
  try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comment/like/${id}`,
        null,
        {headers : {Authorization : localStorage.getItem('authorization')}},
      );
      return response;
  } catch (error) {
    console.error(error);
  }
};
