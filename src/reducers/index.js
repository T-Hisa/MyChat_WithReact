import { combineReducers } from "redux"
// import { reducer as form } from 'redux-form'
import users, { verifiedOtherUserIds } from "./users"
import currentUser from "./currentUser"
import defaultPhoto from "./defaultPhoto"
import directChat from "./directChat"

export default combineReducers({
  users,
  currentUser,
  defaultPhoto,
  verifiedOtherUserIds,
  directChat
})
