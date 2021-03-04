import CurrentUserState from "./currentUser"
import DefaultPhotoState from "./defaultPhoto"
import DirectChatBaseState from "./directChat"
import GroupsState from "./groups"
import GroupChatBaseProps from "./groupChat"
import NotificationsState from "./notifications"
import UsersState from "./users"
import VerifiedotherUserIdsState from "./verifiedOtherUserIds"



export interface BaseState extends DefaultPhotoState {
  currentUser: CurrentUserState;
  directChatd: DirectChatBaseState;
  groupChat: GroupChatBaseProps;
  groups: GroupsState;
  notifications: NotificationsState;
  users: UsersState;
  verifiedOtherUserIds: VerifiedotherUserIdsState;
}
