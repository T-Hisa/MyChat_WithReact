import {
  GET_GROUPS,
  CREATE_GROUP,
  UPDATE_GROUP,
  GroupAction,
} from "../actions/groups";
import { RESET_ALL } from "../actions";

const groups = (groups = {}, action: GroupAction) => {
  switch (action.type) {
    case GET_GROUPS:
      const { groupData } = action;
      return groupData;
    case CREATE_GROUP:
    case UPDATE_GROUP:
      return groups;
    case RESET_ALL:
      return {};
    default:
      return groups;
  }
};

export default groups;
