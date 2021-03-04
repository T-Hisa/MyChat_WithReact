import firebase, { db, BaseState } from "./index";
import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { NotificationsProps, NotificationsPropsWithUserId } from "../types/state";

export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS";
export const DELETE_NOTIFICATIONS = "DELETE_NOTIFICATIONS";

interface GetNotificationAction extends Action {
  type: string;
  notificationData: NotificationsPropsWithUserId;
}

export interface NotificationAction extends GetNotificationAction {
  type: "GET_NOTIFICATIONS" | "DELETE_NOTIFICATIONS" | "RESET_ALL";
}

export const getNotifications = (): ThunkAction<
  void,
  BaseState,
  null,
  Action
> => (dispatch: Dispatch<GetNotificationAction>) => {
  const notificationsRef: firebase.database.Reference = db.ref(`notifications`);
  notificationsRef.on("value", (snapshot: firebase.database.DataSnapshot) => {
    const notificationData: NotificationsPropsWithUserId = snapshot.val();
    dispatch({ type: GET_NOTIFICATIONS, notificationData });
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
