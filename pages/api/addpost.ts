import axios from "axios";

// 필수 컬럼 확인 후 수정
interface insertForm {
    title : string;
    contents : string;
    categoryId : number;
}


export const addPost = async (data: insertForm) => {
  console.log(data);
  const response = await axios.post(
    "http://3.39.195.241:8080/api/post",
    data,
    {headers : {Authorization : localStorage.getItem('authorization')}, withCredentials: true},
  );
  return response;
};
