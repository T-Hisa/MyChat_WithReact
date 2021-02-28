import { combineReducers } from "redux"
// import { reducer as form } from 'redux-form'
import users, { verifiedOtherUserIds } from "./users"
import currentUser from "./currentUser"
import defaultPhoto from "./defaultPhoto"
import directChat from "./directChat"
import groupChat from "./groupChat"
import groups from "./groups"

export default combineReducers({
  currentUser,
  defaultPhoto,
  directChat,
  groupChat,
  groups,
  users,
  verifiedOtherUserIds,
})
