import axios from "axios";

// 필수 컬럼 확인 후 수정
interface CommentForm {
    postId : number;
    comment:string;
}


export const postReplyComment = async (id:number, data: CommentForm) => {
  try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comment/${id}`,
        data,
        {headers : {Authorization : localStorage.getItem('authorization')}, withCredentials: true},
      );
      return response;
  } catch (error) {
    console.error(error);
  }
};
