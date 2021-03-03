import { db, BaseState } from "./index";
import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import ChatProps from "../types/Chat";

export const GET_DIRECT_CHAT = "GET_DIRECT_CHAT";
export const SEND_DIRECT_CHAT = "SEND_DIRECT_CHAT";

export interface GetDirectChatAction extends Action {
  chatData: {
    [currentUid: string]: {
      [otherUid: string]: {
        [cid: string]: ChatProps;
      };
    };
  };
}

export interface DirectChatAction extends GetDirectChatAction {
  type: "GET_DIRECT_CHAT" | "SEND_DIRECT_CHAT";
}

export const getDirectChat = (): ThunkAction<
  void,
  BaseState,
  null,
  GetDirectChatAction
> => (dispatch: Dispatch) => {
  const directChatRef: any = db.ref("chat/direct");
  directChatRef.on("value", (snapshot) => {
    const chatData: any = snapshot.val();
    dispatch({ type: GET_DIRECT_CHAT, chatData });
  });
};

export const sendDirectChat = (data) => {
  const { currentUserId, otherUserId, body } = data;
  const which: string = "me";
  const timestamp: number = new Date().getTime();
  const saveData: ChatProps = { body, which, timestamp };
  const directChatRef: any = db.ref(`chat/direct/${currentUserId}/${otherUserId}`);
  const newKey: string = directChatRef.push().key ?? "";
  directChatRef.child(newKey).set(saveData);
  return { type: SEND_DIRECT_CHAT };
};
