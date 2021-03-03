import { GET_GROUPS, CREATE_GROUP, UPDATE_GROUP } from "../actions/groups"
import { RESET_ALL } from "../actions"

const groups = (groups = {}, action) => {
  switch (action.type) {
    case RESET_ALL:
      return {}
    case GET_GROUPS:
      const { response } = action
      return response
    case CREATE_GROUP:
    case UPDATE_GROUP:
      return groups
    default:
      return groups
  }
}

export default groups
