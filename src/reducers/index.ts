import { combineReducers } from "redux"

import users, { verifiedOtherUserIds } from "./users"
import currentUser from "./currentUser"
import defaultPhoto from "./defaultPhoto"
import directChat from "./directChat"
import groupChat from "./groupChat"
import groups from "./groups"
import notifications from "./notifications"

export default combineReducers({
  currentUser,
  defaultPhoto,
  directChat,
  groupChat,
  groups,
  notifications,
  users,
  verifiedOtherUserIds,
})
