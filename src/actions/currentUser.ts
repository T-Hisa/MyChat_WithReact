import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import firebase from "../firebase-setup";
import { db, BaseState } from "./index";

import UserProps from "../types/user"

export const GET_CURRENT_USER: "GET_CURRENT_USER" = "GET_CURRENT_USER";
export const GET_CURRENT_USER_ID = "GET_CURRENT_USER_ID";
export const RESET_CURRENT_USER = "RESET_CURRENT_USER";

interface GetCurrentUserDataAction extends Action {
  type: string
  currentUser: UserProps
}

interface GetCurrentUserIdAction extends Action {
  type: string
  currentUserId: string;
}

export interface GetCurrentUserAction extends GetCurrentUserDataAction, GetCurrentUserIdAction {
  type: 'GET_CURRENT_USER_ID' | "GET_CURRENT_USER" | "RESET_ALL"
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
  GetCurrentUserDataAction
> => async (dispatch) => {
  const userId: string = await firebase.auth().currentUser?.uid ?? "";
  const currentUserRef: any = db.ref(`users/${userId}`);
  currentUserRef.on("value", (snapshot) => {
    const currentUser: any = snapshot.val();
    dispatch({ type: GET_CURRENT_USER, currentUser });
  });
};

export const getCurrentUserId = (): ThunkAction<
  void,
  BaseState,
  unknown,
  GetCurrentUserIdAction
> => async (dispatch: Dispatch<GetCurrentUserIdAction>) => {
  const currentUser: any = await firebase.auth().currentUser;
  const currentUserId: string = currentUser?.uid;
  dispatch({ type: GET_CURRENT_USER_ID, currentUserId });
};
