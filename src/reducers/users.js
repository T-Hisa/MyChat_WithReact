import {
  GET_USERS,
  SET_PROFILE
} from '../actions/users'

const users = (users = {}, action) => {
  let response
  switch (action.type) {
    case GET_USERS:
      response = action.response
      return { ...response }
    case SET_PROFILE:
      break
    default:
      return users
  }
}

export default users