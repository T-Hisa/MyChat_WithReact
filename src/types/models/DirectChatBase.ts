import { DirectChatProps } from "./Chat";

export default interface DirectChatBase {
  [currentUid: string]: {
    [otherUid: string]: {
      [cid: string]: DirectChatProps;
    };
  };
}
