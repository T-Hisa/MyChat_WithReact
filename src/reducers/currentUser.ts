import { GET_CURRENT_USER, GET_CURRENT_USER_ID, GetCurrentUserAction } from "../actions/currentUser"
import { RESET_ALL } from "../actions"

const currentUser = (user = {}, action: GetCurrentUserAction) => {
  switch (action.type) {
    case GET_CURRENT_USER_ID:
      console.log("action at GET_CURRENT_USER_ID", action)
      // console.log('currentUser in action', )
      const { currentUserId } = action
      return { ...user, currentUserId }
    case GET_CURRENT_USER:
      console.log("action at GET_CURRENT_USER", action)
      const { currentUser } = action
      if (!currentUser.photoURL) currentUser.photoURL = ""
      // ↑ この記述をしておかないと、有 -> 無 に変化した際に変更がProfile コンポーネントに伝わらなくなる
      return { ...user, ...currentUser }
    case RESET_ALL:
      return {}
    default:
      return user
  }
}

export default currentUser
