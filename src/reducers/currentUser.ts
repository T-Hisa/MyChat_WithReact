import { GET_CURRENT_USER, GET_CURRENT_USER_ID, GetCurrentUserAction } from "../actions/currentUser"
import { RESET_ALL } from "../actions"

import { CurrentUserState} from "../types/state"

const currentUser = (user = {}, action: GetCurrentUserAction) => {
  switch (action.type) {
    case GET_CURRENT_USER_ID:
      const { currentUserId } = action
      return { ...user, currentUserId }
    case GET_CURRENT_USER:
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
