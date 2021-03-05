import {
  GET_DIRECT_CHAT,
  SEND_DIRECT_CHAT,
  DirectChatAction,
} from "../actions/directChat";
import { RESET_ALL } from "../actions";

import { DirectChatBaseState } from "../types/state";

const directChat: (
  directChat: DirectChatBaseState,
  action: DirectChatAction
) => DirectChatBaseState = (
  directChatData = null,
  action: DirectChatAction
) => {
  switch (action.type) {
    case GET_DIRECT_CHAT:
      const { directChat } = action;
      if (directChat) return directChat;
      return directChatData;
    case SEND_DIRECT_CHAT:
      return directChatData;
    case RESET_ALL:
      return null;
    default:
      return directChatData;
  }
};

export default directChat;
