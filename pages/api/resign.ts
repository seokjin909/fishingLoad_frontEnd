import axios from "axios";

export const logout = async () => {
  const response = await axios.delete(
    "http://3.39.195.241:8080/api/account/resign",
  );
  return response;
};
