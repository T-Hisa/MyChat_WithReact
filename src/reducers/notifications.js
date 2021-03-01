import {
  GET_NOTIFICATIONS,
  DELETE_NOTIFICATIONS
} from "../actions/notifications"

const notifications = (notifications = {}, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      const { response } = action
      console.log('action at notification reducer', action)
      return response
    case DELETE_NOTIFICATIONS:
    default:
      return notifications
  }
}

export default notifications