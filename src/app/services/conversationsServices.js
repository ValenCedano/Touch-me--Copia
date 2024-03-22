import axios from "axios";
import endpoints from "./data";

export const getAConversation = async (id) => {
  try {
    const { data } = await axios.get(endpoints.aConversation(id));
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const sendAMessage = async (conversationId, conversationList) => {
  try {
    const response = await axios.patch(
      endpoints.aConversation(conversationId),
      { conversations: conversationList }
    );

    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};