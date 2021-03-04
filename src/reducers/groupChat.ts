import {
  GET_GROUP_CHAT,
  SEND_GROUP_CHAT,
  GroupChatAction,
} from "../actions/groupChat";
import { RESET_ALL } from "../actions";

const groupChat = (groupChat = {}, action: GroupChatAction) => {
  switch (action.type) {
    case GET_GROUP_CHAT:
      const { groupChatData } = action;
      return groupChatData;
    case SEND_GROUP_CHAT:
      return groupChat;
    case RESET_ALL:
      return {};
    default:
      return groupChat;
  }
};

export default groupChat;
