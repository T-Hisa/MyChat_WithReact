import firebase, { db } from "./index";
import { Action, Dispatch } from "redux";

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

export const updateUserProfile = (
  data: UpdateProfilePropsForData
): SetProfileAction => {
  const { userId } = data;
  const usersRef: firebase.database.Reference = db.ref(`users/${userId}`);
  const updateData: any = {
    username: data.username,
    photoURL: data.photoURL,
  };
  usersRef.update(updateData);
  return { type: SET_PROFILE };
};

export const setUserProfile = (data: SetProfileProps): SetProfileAction => {
  const { userId, email } = data;
  const usersRef: firebase.database.Reference = db.ref(`users/${userId}`);
  usersRef.set({ email });
  return { type: SET_PROFILE };
};

export const getUsers = () => (dispatch: Dispatch<GetUsersAction>) => {
  const usersRef: firebase.database.Reference = db.ref("users");
  usersRef.on("value", (snapshot: firebase.database.DataSnapshot) => {
    const usersData: UsersProps = snapshot.val();
    dispatch({ type: GET_USERS, usersData });
  });
};
