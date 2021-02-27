import { GET_CURRENT_USER, GET_CURRENT_USER_ID } from "../actions/currentUser"

const currentUser = (user = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_ID:
      const { currentUserId } = action
      return { ...user, currentUserId }
    case GET_CURRENT_USER:
      const { currentUser } = action
      if (!currentUser.photoURL) currentUser.photoURL = null
      // ↑ この記述をしておかないと、有 -> 無 に変化した際に変更がProfile コンポーネントに伝わらなくなる
      return { ...user, ...currentUser }
    default:
      return user
  }
}

export default currentUser
