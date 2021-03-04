import firebase, { db } from "./index";
import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import BaseState, { NotificationsPropsWithUserId, NotificationsProps } from "../types/state";

export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
export const DELETE_NOTIFICATIONS = "DELETE_NOTIFICATIONS";

interface GetNotificationAction extends Action {
  type: string;
  notifications: NotificationsProps | undefined; // userのnotificationがundefined になってる可能性もあるので。
}

export interface NotificationAction extends GetNotificationAction {
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
    console.log("state at notificationAction!", state)
    const userId: string = state.currentUser?.currentUserId!
    const notificationData: NotificationsPropsWithUserId = snapshot.val();
    console.log("notificationData", notificationData)
    const notifications: NotificationsProps = notificationData[userId]
    console.log("notifications", notifications)
    dispatch({ type: GET_NOTIFICATIONS, notifications });
  });
};

export const deleteNotifications = (data) => {
  const { userId, notificationIds } = data;
  const notificationsRef: firebase.database.Reference = db.ref(
    `notifications/${userId}`
  );
  for (const nid of notificationIds) {
    notificationsRef.child(nid).remove();
  }
  return { type: DELETE_NOTIFICATIONS };
};
