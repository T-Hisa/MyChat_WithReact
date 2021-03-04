import firebase, { db, BaseState } from "./index";
import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { DirectChatProps } from "../types/models/Chat";
import SendChatProps from "../types/SendChat"

export const GET_DIRECT_CHAT = "GET_DIRECT_CHAT";
export const SEND_DIRECT_CHAT = "SEND_DIRECT_CHAT";

interface GetDirectChatAction extends Action {
  type: string;
  directChatData: DirectChatProps;
}

export interface DirectChatAction extends GetDirectChatAction {
  type: "GET_DIRECT_CHAT" | "SEND_DIRECT_CHAT" | "RESET_ALL";
}

export const getDirectChat = (): ThunkAction<void, BaseState, null, Action> => (
  dispatch: Dispatch<DirectChatAction>
) => {
  const directChatRef: firebase.database.Reference = db.ref("chat/direct");
  directChatRef.on("value", (snapshot: firebase.database.DataSnapshot) => {
    const directChatData: DirectChatProps = snapshot.val();
    dispatch({ type: GET_DIRECT_CHAT, directChatData });
  });
};

export const sendDirectChat = (data: SendChatProps) => {
  const { currentUserId, otherUserId, body } = data;
  const which: string = "me";
  const timestamp: number = new Date().getTime();
  const saveData: DirectChatProps = { body, which, timestamp };
  const directChatRef: firebase.database.Reference = db.ref(
    `chat/direct/${currentUserId}/${otherUserId}`
  );
  const newKey: string = directChatRef.push().key ?? "";
  directChatRef.child(newKey).set(saveData);
  return { type: SEND_DIRECT_CHAT };
};
