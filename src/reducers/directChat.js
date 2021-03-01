import { GET_DIRECT_CHAT, SEND_DIRECT_CHAT } from "../actions/directChat"
import { RESET_ALL } from "../actions"

const directChat = (directChat = {}, action) => {
  switch (action.type) {
    case RESET_ALL:
      return {}
    case GET_DIRECT_CHAT:
      const { data } = action
      return data
    case SEND_DIRECT_CHAT:
      return directChat
    default:
      return directChat
  }
}

export default directChat
