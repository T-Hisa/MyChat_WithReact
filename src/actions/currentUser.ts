import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import firebase, { db } from "./index";

import UserProps from "../types/models/User";
import { BaseAction } from "./index";
import BaseState from "../types/state";

export const GET_CURRENT_USER: "GET_CURRENT_USER" = "GET_CURRENT_USER";
export const GET_CURRENT_USER_ID = "GET_CURRENT_USER_ID";

export interface GetCurrentUserDataAction extends Action {
  type: string;
  currentUser: UserProps;
}

export interface GetCurrentUserIdAction extends Action {
  type: string;
  currentUserId: string;
}

type SampleAction<T> = ThunkAction<Promise<T>, BaseState, undefined, Action>;

export interface GetCurrentUserAction
  extends GetCurrentUserDataAction,
    GetCurrentUserIdAction {
  type: "GET_CURRENT_USER" | "GET_CURRENT_USER_ID" | "RESET_ALL";
}

export const getCurrentUser = (): ThunkAction<
  Promise<void>,
  BaseState,
  undefined,
  BaseAction
> => async (dispatch: Dispatch<GetCurrentUserDataAction>) => {
  const userId: string = (await firebase.auth().currentUser?.uid) ?? "";
  const currentUserRef: firebase.database.Reference = db.ref(`users/${userId}`);
  currentUserRef.on("value", (snapshot: firebase.database.DataSnapshot) => {
    const currentUser: UserProps = snapshot.val();
    dispatch({ type: GET_CURRENT_USER, currentUser });
  });
};

export const getCurrentUserId = (): ThunkAction<
  void,
  BaseState,
  undefined,
  BaseAction
> => async (dispatch: Dispatch<GetCurrentUserIdAction>) => {
  const currentUser: firebase.User = await firebase.auth().currentUser!;
  const currentUserId: string = currentUser.uid;
  dispatch({ type: GET_CURRENT_USER_ID, currentUserId });
};
