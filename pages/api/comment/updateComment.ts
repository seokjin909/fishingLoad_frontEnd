import axios from "axios";

interface Props {
    postId : number;
    comment:string;
}
export const updateComment = async (id: number,comment:Props) => {
  try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comment/${id}`,
        comment,
        {headers : {Authorization : localStorage.getItem('authorization')}, withCredentials: true},
      );
      return response;
  } catch (error) {
    console.error(error);
  }
};
