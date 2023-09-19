import axios from "axios";

// 마이페이지
export const getMyPage = async () => {
  const response = await axios.get(
    "http://3.39.195.241:8080/api/account/mypage?page=1&size=5&sortBy=title&isAsc=true",
    {
      headers: {
        Authorization: localStorage.getItem("authorization"),
        Authorization_Refresh: localStorage.getItem("authorization_refresh"),
      },
    },
  );
  try {
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 회원 탈퇴
export const resign = async () => {
  const response = await axios.delete(
    "http://3.39.195.241:8080/api/account/resign",
    {
      headers: {
        Authorization: localStorage.getItem("authorization"),
        Authorization_Refresh: localStorage.getItem("authorization_refresh"),
      },
    },
  );
  return response;
};

// 게시글 정보 불러오기
export const getMyInfo = async () => {
  const response = await axios.get(
    "http://3.39.195.241:8080/api/account/myinfo",
    {
      headers: {
        Authorization: localStorage.getItem("authorization"),
        Authorization_Refresh: localStorage.getItem("authorization_refresh"),
      },
    },
  );
  try {
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 회원정보 수정
export const modifierUser = async (data: any) => {
  const response = await axios.put(
    `http://3.39.195.241:8080/api/account/${data.userId}`,
    data,
    {
      headers: {
        Authorization: localStorage.getItem("authorization"),
        Authorization_Refresh: localStorage.getItem("authorization_refresh"),
      },
    },
  );
  return response;
};
