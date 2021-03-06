import {
  GET_CURRENT_USER_ID,
  GetCurrentUserIdAction,
} from "../actions/currentUser";
import { RESET_ALL } from "../actions";

const currentUserId = (
  uid: string = "",
  action: GetCurrentUserIdAction
): string => {
  switch (action.type) {
    case GET_CURRENT_USER_ID:
      const { currentUserId } = action;
      return currentUserId;
    case RESET_ALL:
      return ""
    default:
      return uid
  }
};

export default currentUserId
