import { GET_GROUP_CHAT, SEND_GROUP_CHAT } from "../actions/groupChat"

const groupChat = (groupChat={}, action) => {
  switch (action.type) {
    case GET_GROUP_CHAT:
      const {data} = action
      return data
    case SEND_GROUP_CHAT:
      return groupChat
    default:
      return groupChat
  }
}

export default groupChat