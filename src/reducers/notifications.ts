import { RESET_ALL } from "../actions"
import {
  GET_NOTIFICATIONS,
  DELETE_NOTIFICATIONS,
  NotificationAction
} from "../actions/notifications"

const notifications = (notifications = {}, action: NotificationAction) => {
  switch (action.type) {
    case RESET_ALL:
      return {}
    case GET_NOTIFICATIONS:
      const { notificationData } = action
      return notificationData
    case DELETE_NOTIFICATIONS:
    default:
      return notifications
  }
}

export default notifications