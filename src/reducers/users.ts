import firebase from "../firebase-setup";
import { GET_USERS, SET_PROFILE, UserAction } from "../actions/users";
import { RESET_ALL } from "../actions";

import { UsersState, VerifiedOtherUserIdsState } from "../types/state";

// const users = (users = {}, action) => {
const users: (users: UsersState, action: UserAction) => UsersState = (
  users = null,
  action
) => {
  switch (action.type) {
    case RESET_ALL:
      return null;
    case GET_USERS:
      const { usersData } = action;
      if (users) return { ...users, ...usersData };
      else return usersData;
    case SET_PROFILE:
    default:
      console.log("users", users);
      return users;
  }
};

export const verifiedOtherUserIds: (
  userIds: VerifiedOtherUserIdsState,
  action: UserAction
) => VerifiedOtherUserIdsState = (userIds = null, action) => {
  switch (action.type) {
    case RESET_ALL:
      return null;
    case GET_USERS:
      const { usersData } = action;
      const verifiedOtherUserIds: Array<string> = Object.keys(usersData).filter(
        (uid) => {
          const currentUserId: string = firebase.auth().currentUser?.uid!;
          return !!usersData[uid].username && uid !== currentUserId;
        }
      );
      return verifiedOtherUserIds;
    default:
      return userIds;
  }
};

export default users;
