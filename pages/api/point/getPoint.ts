import { Store } from "@/types/store";
import axios from "axios";

export const getPoint = async () => {
  try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/post`,
        {withCredentials: true},
      );
      return response.data.posts;
  } catch (error) {
    console.error(error);
  }
};
