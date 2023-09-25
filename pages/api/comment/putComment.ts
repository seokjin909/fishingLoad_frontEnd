import axios from "axios";

export const putComment = async (id: number) => {
  try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/comment/like/${id}`,
        null,
        {headers : {Authorization : localStorage.getItem('authorization'),Authorization_Refresh: localStorage.getItem("authorization_refresh")},
        withCredentials: true
      },
      );
      console.log(response);
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
