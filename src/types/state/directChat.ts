import { DirectChatProps } from "../models/Chat";
export default interface DirectChatBaseState {
  [currentUid: string]: {
    [otherUid: string]: {
      [cid: string]: DirectChatProps;
    };
  };
}