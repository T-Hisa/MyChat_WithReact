import {
  GET_CURRENT_USER,
  GET_CURRENT_USER_ID
} from  "../actions/currentUser"

const currentUser = (user = {}, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_ID:
      const {currentUserId} = action
      console.log('action at currentUserId', currentUserId)
      return {currentUserId}
    case GET_CURRENT_USER:
      const {currentUser} = action
      console.log('response at current type', action)
      return currentUser
    default:
      return user
  }
}

export default currentUser