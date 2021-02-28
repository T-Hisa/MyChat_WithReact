import { GET_DIRECT_CHAT, SEND_DIRECT_CHAT } from "../actions/directChat"

const directChat = (directChat = {}, action) => {
  switch (action.type) {
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
