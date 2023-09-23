import axios from "axios";

// 필수 컬럼 확인 후 수정
interface CommentForm {
    postId : number;
    comment:string;
}


export const postReplyComment = async (id:number, data: CommentForm) => {
  try {
      const response = await axios.post(
        `http://3.39.195.241:8080/api/comment/${id}`,
        data,
        {headers : {Authorization : localStorage.getItem('authorization')}, withCredentials: true},
      );
      return response;
  } catch (error) {
    console.error(error);
  }
};
