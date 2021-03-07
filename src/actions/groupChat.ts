import { Action, Dispatch } from "redux";
import firebase, { db } from "./index";

import { GroupChatProps } from "../types/models/Chat";
import SendChatProps from "../types/SendChat";

export const GET_GROUP_CHAT = "GET_GROUP_CHAT";
export const SEND_GROUP_CHAT = "SEND_GROUP_CHAT";

interface GetGroupChatAction extends Action {
  type: string;
  groupChatData: GroupChatProps;
}

interface SendGroupChatAction extends Action {
  type: string;
}

export interface GroupChatAction
  extends GetGroupChatAction,
    SendGroupChatAction {
  type: "GET_GROUP_CHAT" | "SEND_GROUP_CHAT" | "RESET_ALL";
}

export const getGroupChat = () => (dispatch: Dispatch<GetGroupChatAction>) => {
  const groupChatRef: firebase.database.Reference = db.ref("chat/groups");
  groupChatRef.on("value", (snapshot: firebase.database.DataSnapshot) => {
    const groupChatData: GroupChatProps = snapshot.val();
    dispatch({ type: GET_GROUP_CHAT, groupChatData });
  });
};

export const sendGroupChat = (data: SendChatProps): SendGroupChatAction => {
  const groupId: string = data.groupId!;
  const { body, currentUserId } = data;
  const timestamp: number = new Date().getTime();
  const saveData: GroupChatProps = { body, timestamp, uid: currentUserId };
  const groupChatRef: firebase.database.Reference = db.ref(
    `chat/groups/${groupId}`
  );
  const newKey: string = groupChatRef.push().key ?? "";
  groupChatRef.child(newKey).set(saveData);
  return { type: SEND_GROUP_CHAT };
};
