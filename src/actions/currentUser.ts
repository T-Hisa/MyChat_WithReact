import { Action, Dispatch } from "redux";
import firebase, { db } from "./index";

import UserProps from "../types/models/User";

export const GET_CURRENT_USER: "GET_CURRENT_USER" = "GET_CURRENT_USER";
export const GET_CURRENT_USER_ID = "GET_CURRENT_USER_ID";

export interface GetCurrentUserDataAction extends Action {
  type: "GET_CURRENT_USER" | "RESET_ALL";
  currentUser: UserProps;
}

export interface GetCurrentUserIdAction extends Action {
  type: string;
  currentUserId: string;
}

export const getCurrentUser = () => async (dispatch: Dispatch<GetCurrentUserDataAction>) => {
  const userId: string = (await firebase.auth().currentUser?.uid) ?? "";
  const currentUserRef: firebase.database.Reference = db.ref(`users/${userId}`);
  currentUserRef.on("value", (snapshot: firebase.database.DataSnapshot) => {
    const currentUser: UserProps = snapshot.val();
    dispatch({ type: GET_CURRENT_USER, currentUser });
  });
};

export const getCurrentUserId = () => async (dispatch: Dispatch<GetCurrentUserIdAction>) => {
  const currentUser: firebase.User = await firebase.auth().currentUser!;
  const currentUserId: string = currentUser.uid;
  dispatch({ type: GET_CURRENT_USER_ID, currentUserId });
};
