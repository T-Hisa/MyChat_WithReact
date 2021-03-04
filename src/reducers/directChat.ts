import { GET_DIRECT_CHAT, SEND_DIRECT_CHAT, DirectChatAction } from "../actions/directChat"
import { RESET_ALL } from "../actions"

const directChat = (directChat = {}, action: DirectChatAction) => {
  switch (action.type) {
    case GET_DIRECT_CHAT:
      const { directChatData } = action
      return directChatData
    case SEND_DIRECT_CHAT:
      return directChat
    case RESET_ALL:
      return {}
    default:
      return directChat
  }
}

export default directChat
