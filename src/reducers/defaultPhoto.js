import {
  GET_DEFAULT_PHOTO
} from "../actions/defaultPhoto"

const defaultPhoto = (photo = {}, action) => {
  switch (action.type) {
    case GET_DEFAULT_PHOTO:
      console.log("actions at defaultphoto", action)
      return action.url
    default:
      return photo
  }
}

export default defaultPhoto