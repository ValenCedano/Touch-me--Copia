import axios from "axios";
import endpoints from "./data";

export const getUser = async () => {
  try {
    const { data } = await axios.get(endpoints.user);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};


export const getUserChat = async () => {
    try {
      const { data } = await axios.get(endpoints.chats);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
};




