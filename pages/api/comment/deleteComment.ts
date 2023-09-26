import axios from "axios";

export const deleteComment = async (id: number) => {
  let token:any = "";
  try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comment/${id}`,
        { headers : { 
          Authorization : localStorage.getItem('authorization'), 
          Authorization_Refresh: localStorage.getItem("authorization_refresh")
        }, withCredentials: true},
      );
      if(response.headers.authorization){
        console.log("Access 토큰 재발급 🛠️");
        token = response.headers.authorization;
      } else {
        console.log("유효한 Access 토큰입니다 😀")
        token = localStorage.getItem('authorization');
      }
    return response;
  } catch (error:any) {
    console.error(error);
    if(error.headers?.authorization){
      console.log("토큰이 만료 및 API 요쳥 에러 ❗️");
      token = error.headers.authorization;
    } else {
      token = localStorage.getItem('authorization');
    }
  } finally {
    localStorage.setItem('authorization', token);
  }
};
