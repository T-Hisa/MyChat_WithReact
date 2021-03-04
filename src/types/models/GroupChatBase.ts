import { GroupChatProps } from "./Chat";

export default interface GroupChatBase {
  [groupId: string]: {
    [chatId: string]: GroupChatProps;
  };
}
