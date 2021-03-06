import UserProps from "../models/User";
import { DirectChatProps, GroupChatProps } from "../models/Chat";
import GroupProps from "../models/Group";
import NotificationProps from "../models/Notification";

export type CurrentUserState = UserProps | null;

export interface DirectChatDataProps {
  [cid: string]: DirectChatProps;
}

export type DirectChatDataState = DirectChatDataProps | null;

export interface DirectChatBaseProps {
  [currentUid: string]: {
    [otherUid: string]: DirectChatDataProps;
  };
}

export type DirectChatBaseState = DirectChatBaseProps | null;

export interface GroupChatDataProps {
  [chatId: string]: GroupChatProps;
}

export type GroupChatDataState = GroupChatDataProps | null;

export interface GroupChatBaseProps {
  [groupId: string]: GroupChatDataProps;
}

export type GroupChatBaseState = GroupChatBaseProps | null;

export interface GroupsProps {
  [groupId: string]: GroupProps;
}

export type GroupsState = GroupsProps | null;

export interface NotificationsProps {
  [nid: string]: NotificationProps;
}

// export type NotificationsState = NotificationsProps | null;
export type NotificationsState = NotificationsProps | null;

interface NotificationsPropsWithUserId {
  [uid: string]: NotificationsProps;
}
export type NotificationsStateWithUserId = NotificationsPropsWithUserId | null;

export interface UsersProps {
  [userId: string]: UserProps;
}
export type UsersState = UsersProps | null;

export type VerifiedOtherUserIdsProps = Array<string>;
export type VerifiedOtherUserIdsState = VerifiedOtherUserIdsProps | null;

export default interface BaseState {
  currentUser: CurrentUserState;
  currentUserId: string;
  defaultPhoto: string;
  directChat: DirectChatBaseState;
  groupChat: GroupChatBaseState;
  groups: GroupsState;
  notifications: NotificationsState;
  users: UsersState;
  verifiedOtherUserIds: VerifiedOtherUserIdsState;
}
