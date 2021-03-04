import firebase, { db, BaseState } from "./index";
import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { UsersProps } from "../types/state";
import { SetProfileProps, UpdateProfilePropsForData } from "../types/Profile";

export const GET_USERS = "GET_USERS";
export const SET_PROFILE = "SET_PROFILE";

interface GetUsersAction extends Action {
  type: string;
  usersData: UsersProps;
}

interface SetProfileAction extends Action {
  type: string;
}

export interface UserAction extends GetUsersAction, SetProfileAction {
  type: "GET_USERS" | "SET_PROFILE" | "RESET_ALL";
}

export const updateUserProfile: (
  data: UpdateProfilePropsForData
) => SetProfileAction = (data) => {
  const { userId } = data;
  const usersRef: firebase.database.Reference = db.ref(`users/${userId}`);
  const updateData: any = {
    username: data.username,
    photoURL: data.photoURL,
  };
  usersRef.update(updateData);
  return { type: SET_PROFILE };
};

export const setUserProfile: (data: SetProfileProps) => SetProfileAction = (
  data
) => {
  const { userId, email } = data;
  const usersRef: firebase.database.Reference = db.ref(`users/${userId}`);
  usersRef.set({ email });
  return { type: SET_PROFILE };
};

export const getUsers = (): ThunkAction<void, BaseState, null, Action> => (
  dispatch: Dispatch<GetUsersAction>
) => {
  const usersRef: firebase.database.Reference = db.ref("users");
  console.log("getusersAction")
  usersRef.on("value", (snapshot: firebase.database.DataSnapshot) => {
    const usersData: UsersProps = snapshot.val();
    console.log("usersData", usersData)
    dispatch({ type: GET_USERS, usersData });
  });
};
