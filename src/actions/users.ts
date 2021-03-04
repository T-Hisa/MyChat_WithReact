import firebase, { db, BaseState } from "./index";
import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import UserProps from "../types/models/User";

export const GET_USERS = "GET_USERS";
export const SET_PROFILE = "SET_PROFILE";

interface GetUsersAction {
  type: string;
  usersData: UserProps;
}

export interface UserAction extends GetUsersAction {
  type: "GET_USERS" | "SET_PROFILE" | "RESET_ALL" | "REFRESH_ALL";
}

export const updateUserProfile = (data) => {
  const { userId } = data;
  const usersRef: firebase.database.Reference = db.ref(`users/${userId}`);
  const updateData: any = {
    username: data.username,
    photoURL: data.photoURL,
  };
  usersRef.update(updateData);
  return { type: SET_PROFILE };
};

export const setUserProfile = (data) => {
  const { uid, email } = data;
  const usersRef: firebase.database.Reference = db.ref(`users/${uid}`);
  usersRef.set({ email });
  return { type: SET_PROFILE };
};

export const getUsers = (): ThunkAction<void, BaseState, null, Action> => (
  dispatch: Dispatch<GetUsersAction>
) => {
  const usersRef: firebase.database.Reference = db.ref("users");
  usersRef.on("value", (snapshot: firebase.database.DataSnapshot) => {
    const usersData: UserProps = snapshot.val();
    dispatch({ type: GET_USERS, usersData });
  });
};
