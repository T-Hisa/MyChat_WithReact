import firebase, { db } from "./index";
import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import BaseState, { NotificationsStateWithUserId, NotificationsProps } from "../types/state";
import DeleteNotificationsData from "../types/DeleteNotifications"

export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
export const DELETE_NOTIFICATIONS = "DELETE_NOTIFICATIONS";

interface GetNotificationAction extends Action {
  type: string;
  notifications: NotificationsProps | undefined; // userのnotificationがundefined になってる可能性もあるので。
}

interface DeleteNotificationAction extends Action {
  type: string
}

export interface NotificationAction extends GetNotificationAction, DeleteNotificationAction {
  type: "GET_NOTIFICATIONS" | "DELETE_NOTIFICATIONS" | "RESET_ALL";
}

export const getNotifications = (): ThunkAction<
  void,
  BaseState,
  null,
  Action
> => (dispatch: Dispatch<GetNotificationAction>, getState: () => BaseState) => {
  const notificationsRef: firebase.database.Reference = db.ref(`notifications`);
  notificationsRef.on("value", (snapshot: firebase.database.DataSnapshot) => {
    const state: BaseState = getState()
    const userId: string = state.currentUser?.currentUserId!
    const notificationData: NotificationsStateWithUserId = snapshot.val();
    console.log("notificationData", notificationData)
    const notifications: NotificationsProps = notificationData![userId]
    console.log("notifications", notifications)
    dispatch({ type: GET_NOTIFICATIONS, notifications });
  });
};

export const deleteNotifications = (data: DeleteNotificationsData): DeleteNotificationAction => {
  const { userId, notificationIds } = data;
  const notificationsRef: firebase.database.Reference = db.ref(
    `notifications/${userId}`
  );
  for (const nid of notificationIds) {
    notificationsRef.child(nid).remove();
  }
  return { type: DELETE_NOTIFICATIONS };
};
