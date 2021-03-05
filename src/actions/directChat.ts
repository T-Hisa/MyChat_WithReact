import firebase, { db } from "./index";
import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { DirectChatProps } from "../types/models/Chat";
import SendChatProps from "../types/SendChat"
import  { /* DirectChatBaseProps,*/ DirectChatBaseState } from "../types/state"

export const GET_DIRECT_CHAT = "GET_DIRECT_CHAT";
export const SEND_DIRECT_CHAT = "SEND_DIRECT_CHAT";

interface GetDirectChatAction extends Action {
  type: string;
  directChat: DirectChatBaseState;
  // 本当は DirectChatBaseProps にしたかったが、reducers/directChat の方でエラーが吐かれるので渋々
}

export interface DirectChatAction extends GetDirectChatAction {
  type: "GET_DIRECT_CHAT" | "SEND_DIRECT_CHAT" | "RESET_ALL";
}

export const getDirectChat = (): ThunkAction<void, any, null, Action> => (
  dispatch: Dispatch<DirectChatAction>
) => {
  const directChatRef: firebase.database.Reference = db.ref("chat/direct");
  directChatRef.on("value", (snapshot: firebase.database.DataSnapshot) => {
    const directChat: DirectChatBaseState = snapshot.val();
    dispatch({ type: GET_DIRECT_CHAT, directChat });
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
