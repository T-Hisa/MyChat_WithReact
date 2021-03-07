import {
  GET_CURRENT_USER,
  GetCurrentUserDataAction,
} from "../actions/currentUser";
import { RESET_ALL } from "../actions";

import { CurrentUserState } from "../types/state";

const currentUser = (
  user: CurrentUserState = null,
  action: GetCurrentUserDataAction
): CurrentUserState => {
  switch (action.type) {
    case GET_CURRENT_USER:
      console.log("action", action)
      const { currentUser } = action;
      if (currentUser && !currentUser.photoURL) currentUser.photoURL = "";
      // ↑ この記述をしておかないと、有 -> 無 に変化した際に変更がProfile コンポーネントに伝わらなくなる
      return { ...user, ...currentUser };
    case RESET_ALL:
      return null;
    default:
      return user;
  }
};

export default currentUser;
