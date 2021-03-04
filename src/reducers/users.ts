import firebase from "../firebase-setup";
import { GET_USERS, SET_PROFILE, UserAction } from "../actions/users";
import { RESET_ALL } from "../actions";

const users = (users = {}, action: UserAction) => {
  switch (action.type) {
    case RESET_ALL:
      return {};
    case GET_USERS:
      const { usersData } = action;
      return { ...users, ...usersData };
    case SET_PROFILE:
    default:
      return users;
  }
};

export const verifiedOtherUserIds = (userIds = {}, action: UserAction) => {
  switch (action.type) {
    case RESET_ALL:
      return {};
    case GET_USERS:
      const { usersData } = action;
      const verifiedOtherUserIds: Array<string> = Object.keys(usersData).filter((uid) => {
        const currentUserId: string = firebase.auth().currentUser?.uid!;
        return !!usersData[uid].username && uid !== currentUserId;
      });
      return verifiedOtherUserIds;
    default:
      return userIds;
  }
};

export default users;
