import axios from "axios";

// 필수 컬럼 확인 후 수정
interface insertForm {
    title : string;
    contents : string;
    categoryId : number;
}


export const addPost = async (data: insertForm) => {
  try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post`,
        data,
        {headers : {Authorization : localStorage.getItem('authorization')}, withCredentials: true},
      );
        return response;
  } catch (error) {
    console.error(error);
  }
};
