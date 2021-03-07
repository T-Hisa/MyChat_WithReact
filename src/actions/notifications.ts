import firebase, { db } from "./index";
import { Action, Dispatch } from "redux";

import BaseState, {
  NotificationsStateWithUserId,
  NotificationsState,
} from "../types/state";
import DeleteNotificationsData from "../types/DeleteNotifications";

export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
export const DELETE_NOTIFICATIONS = "DELETE_NOTIFICATIONS";

interface GetNotificationAction extends Action {
  type: string;
  notifications: NotificationsState | undefined; // userのnotificationがundefined になってる可能性もあるので。
}

interface DeleteNotificationAction extends Action {
  type: string;
}

export interface NotificationAction
  extends GetNotificationAction,
    DeleteNotificationAction {
  type: "GET_NOTIFICATIONS" | "DELETE_NOTIFICATIONS" | "RESET_ALL";
}

export const getNotifications = () => (
  dispatch: Dispatch<GetNotificationAction>,
  getState: () => BaseState
) => {
  const notificationsRef: firebase.database.Reference = db.ref(`notifications`);
  notificationsRef.on("value", (snapshot: firebase.database.DataSnapshot) => {
    const state: BaseState = getState();
    const userId: string = state.currentUserId!;
    const notificationData: NotificationsStateWithUserId = snapshot.val();
    let notifications: NotificationsState = null;
    if (notificationData && notificationData[userId])
      notifications = notificationData[userId]
    dispatch({ type: GET_NOTIFICATIONS, notifications });
  });
};

export const deleteNotifications = (
  data: DeleteNotificationsData
): DeleteNotificationAction => {
  const { userId, notificationIds } = data;
  const notificationsRef: firebase.database.Reference = db.ref(
    `notifications/${userId}`
  );
  for (const nid of notificationIds) {
    notificationsRef.child(nid).remove();
  }
  return { type: DELETE_NOTIFICATIONS };
};
