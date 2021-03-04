import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import firebase, { db, BaseState } from "./index";

import UserProps from "../types/models/User";

export const GET_CURRENT_USER: "GET_CURRENT_USER" = "GET_CURRENT_USER";
export const GET_CURRENT_USER_ID = "GET_CURRENT_USER_ID";
export const RESET_CURRENT_USER = "RESET_CURRENT_USER";

interface GetCurrentUserDataAction extends Action {
  type: string;
  currentUser: UserProps;
}

interface GetCurrentUserIdAction extends Action {
  type: string;
  currentUserId: string;
}

export interface GetCurrentUserAction
  extends GetCurrentUserDataAction,
    GetCurrentUserIdAction {
  type: "GET_CURRENT_USER" | "GET_CURRENT_USER_ID" | "RESET_ALL" | "REFRESH_ALL";
}

// export interface GetCurrentUserState {
//   currentUser: {
//     currentUserId: string
//     username: string
//     email: string
//     photoURL: string
//   }
// }

// export interface GetCurrentUserIdState {
//   type: string
//   currrentUserId:string
// }

export const getCurrentUser = (): ThunkAction<
  void,
  BaseState,
  null,
  Action
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
  unknown,
  Action
> => async (dispatch: Dispatch<GetCurrentUserIdAction>) => {
  const currentUser: firebase.User = await firebase.auth().currentUser!;
  const currentUserId: string = currentUser.uid;
  dispatch({ type: GET_CURRENT_USER_ID, currentUserId });
};
