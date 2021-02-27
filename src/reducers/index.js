import { combineReducers } from "redux"
// import { reducer as form } from 'redux-form'
import users from "./users"
import currentUser from "./currentUser"
import defaultPhoto from "./defaultPhoto"

export default combineReducers({
  users,
  currentUser,
  defaultPhoto
})
