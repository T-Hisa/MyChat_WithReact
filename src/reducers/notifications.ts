import { RESET_ALL } from "../actions";
import {
  GET_NOTIFICATIONS,
  DELETE_NOTIFICATIONS,
  NotificationAction,
} from "../actions/notifications";

import { NotificationsState } from "../types/state";

const notifications: (
  notifications: NotificationsState,
  action: NotificationAction
) => NotificationsState = (notifications = null, action: NotificationAction) => {
  switch (action.type) {
    case RESET_ALL:
      return null;
    case GET_NOTIFICATIONS:
      const { notificationData } = action;
      return notificationData;
    case DELETE_NOTIFICATIONS:
    default:
      return notifications;
  }
};

export default notifications;
