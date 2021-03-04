import { GroupChatProps } from "../models/Chat";
export default interface GroupChatBaseProps {
  [groupId: string]: {
    [chatId: string]: GroupChatProps;
  };
}