import firebase from "../firebase-setup"
import {
  GET_USERS
} from '../actions/users'

const users = (users = {}, action) => {
  let response
  switch (action.type) {
    case GET_USERS:
      response = action.response
      console.log("action at getUsers", action)
      return { ...users, ...response }
    default:
      return users
  }
}

export const verifiedOtherUserIds = (userIds = {}, action) => {
  switch (action.type) {
    case GET_USERS:
      const response = action.response
      const verifiedOtherUserIds = Object.keys(response).filter(uid => {
        return (!!response[uid].username && uid !== firebase.auth().currentUser.uid)
      })
      return verifiedOtherUserIds
    default:
      return userIds
  }
}

export default users