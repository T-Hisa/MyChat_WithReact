import firebase from "../firebase-setup"
import {
  GET_USERS,
  SET_PROFILE
} from '../actions/users'
import { RESET_ALL } from "../actions"

const users = (users = {}, action) => {
  let response
  switch (action.type) {
    case RESET_ALL:
      return {}
    case GET_USERS:
      response = action.response
      return { ...users, ...response }
    case SET_PROFILE:
    default:
      return users
  }
}

export const verifiedOtherUserIds = (userIds = {}, action) => {
  switch (action.type) {
    case RESET_ALL:
      return {}
    case GET_USERS:
      const response = action.response
      const verifiedOtherUserIds = Object.keys(response).filter(uid => {
        const currentUser = firebase.auth().currentUser || {}
        const currentUserId = currentUser.uid || ""
        return (!!response[uid].username && uid !== currentUserId)
      })
      return verifiedOtherUserIds
    default:
      return userIds
  }
}

export default users