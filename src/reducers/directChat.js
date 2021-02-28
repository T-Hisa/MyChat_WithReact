import {
  GET_DIRECT_CHAT
} from "../actions/directChat"

const directChat = (directChat = {}, action) => {
  switch (action.type) {
    case GET_DIRECT_CHAT:
      console.log("reducer at directchat", action)
      const {data} = action
      return data
    default:
      return directChat
  }
}

export default directChat