import { Store } from "@/types/store";
import axios from "axios";

export const getPoint = async () => {
  try {
      const response = await axios.get(
        `http://3.39.195.241:8080/api/post`,
        {withCredentials: true},
      );
      return response.data.posts;
  } catch (error) {
    console.error(error);
  }
};
