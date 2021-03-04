import UserProps from "../models/User";
import { DirectChatProps, GroupChatProps } from "../models/Chat";
import GroupProps from "../models/Group";
import NotificationProps from "../models/Notification";

export interface CurrentUserProps extends UserProps {
  currentUserId: string;
}

export type CurrentUserState = CurrentUserProps | null;

export interface DirectChatBaseProps {
  [currentUid: string]: {
    [otherUid: string]: {
      [cid: string]: DirectChatProps;
    };
  };
}

export type DirectChatBaseState = DirectChatBaseProps | null;

export interface GroupChatBaseProps {
  [groupId: string]: {
    [chatId: string]: GroupChatProps;
  };
}
export type GroupChatBaseState = GroupChatBaseProps | null;

export interface GroupsProps {
  [groupId: string]: GroupProps;
}
export type GroupsState = GroupsProps | null;

export interface NotificationsProps {
  [nid: string]: NotificationProps;
}

export interface NotificationsPropsWithUserId {
  [uid: string]: NotificationsProps
}

// export type NotificationsState = NotificationsProps | null;
export type NotificationsState = NotificationsProps | null;

export interface UsersProps {
  [userId: string]: UserProps;
}
export type UsersState = UsersProps | null;

export type VerifiedOtherUserIdsProps = Array<string>
export type VerifiedOtherUserIdsState = VerifiedOtherUserIdsProps | null;

export default interface BaseState {
  currentUser: CurrentUserState;
  directChat: DirectChatBaseState;
  groupChat: GroupChatBaseState;
  groups: GroupsState;
  notifications: NotificationsState;
  users: UsersState;
  verifiedOtherUserIds: VerifiedOtherUserIdsState;
  defaultPhoto: string;
}
