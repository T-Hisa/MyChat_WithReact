import {
  GET_NOTIFICATIONS,
  DELETE_NOTIFICATIONS
} from "../actions/notifications"

const notifications = (notifications = {}, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      const { response } = action
      return response
    case DELETE_NOTIFICATIONS:
      const 
  }
}

export default notifications