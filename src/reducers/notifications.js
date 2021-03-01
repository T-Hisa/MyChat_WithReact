import { RESET_ALL } from "../actions"
import {
  GET_NOTIFICATIONS,
  DELETE_NOTIFICATIONS
} from "../actions/notifications"

const notifications = (notifications = {}, action) => {
  switch (action.type) {
    case RESET_ALL:
      return {}
    case GET_NOTIFICATIONS:
      const { response } = action
      return response
    case DELETE_NOTIFICATIONS:
    default:
      return notifications
  }
}

export default notifications