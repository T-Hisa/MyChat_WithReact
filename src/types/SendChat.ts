export default interface SendChatProps {
  currentUserId: string;
  otherUserId?: string;
  groupId?: string;
  body: string;
}
