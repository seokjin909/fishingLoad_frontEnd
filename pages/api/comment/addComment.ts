import axios from "axios";

// 필수 컬럼 확인 후 수정
interface CommentForm {
    postId:number;
    comment:string;
}


export const addComment = async (data: CommentForm) => {
  try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comment`,
        data,
        {
        headers : {
          Authorization : localStorage.getItem('authorization'), 
          Authorization_Refresh: localStorage.getItem("authorization_refresh")
      }, 
        withCredentials: true},
      );

      if(response.headers.authorization){
        console.log("Access 토큰 재발급 🛠️");
        localStorage.setItem('authorization', response.headers.authorization);
      } else {
        console.log("유효한 Access 토큰입니다 😀")
      }
      return response;
  } catch (error) {
    console.error(error);
  }
};
