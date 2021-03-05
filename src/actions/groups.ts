import firebase, { db } from "./index";
import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import UpDateGroupProps from "../types/UpdateGroup";
import GroupProps from "../types/models/Group";

export const GET_GROUPS = "GET_GROUPS";
export const CREATE_GROUP = "CREATE_GROUP";
export const UPDATE_GROUP = "UPDATE_GROUP";

interface GetGroupAction extends Action {
  type: string;
  groupData: GroupProps;
}

interface SendGroupAction extends Action {
  type: string;
}

export interface GroupAction extends GetGroupAction, SendGroupAction {
  type: "GET_GROUPS" | "CREATE_GROUP" | "UPDATE_GROUP" | "RESET_ALL";
}

export const getGroups = (): ThunkAction<void, any, null, Action> => (
  dispatch: Dispatch<GetGroupAction>
) => {
  const groupRef: firebase.database.Reference = db.ref("groups");
  groupRef.on("value", (snapshot: firebase.database.DataSnapshot) => {
    const groupData: GroupProps = snapshot.val();
    dispatch({ type: GET_GROUPS, groupData });
  });
};

export const createGroup = (data: GroupProps): SendGroupAction => {
  const groupRef: firebase.database.Reference = db.ref("groups");
  const newKey: string = groupRef.push().key ?? "";
  groupRef.child(newKey).set(data);
  return { type: CREATE_GROUP };
};

export const updateGroup = (data: UpDateGroupProps): SendGroupAction => {
  const { gid, groupName, memberIds } = data;
  const groupRef: firebase.database.Reference = db.ref(`groups/${gid}`);
  groupRef.update({ groupName, memberIds });
  return { type: UPDATE_GROUP };
};
