import { GET_GROUPS, CREATE_GROUP } from "../actions/groups"

const groups = (groups = {}, action) => {
  switch(action.type) {
    case GET_GROUPS:
      const {response} = action
      return response
    case CREATE_GROUP:
      return groups
    default:
      return groups
  }
}

export default groups