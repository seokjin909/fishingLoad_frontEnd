import axios from "axios";

export const getMyPage = async () => {
  // const access = localStorage.getItem('access')
  try {
    const response = await axios.get(
      "http://3.39.195.241:8080/api/account/myinfo",
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
