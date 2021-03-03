import {
  GET_DEFAULT_PHOTO,
  GetDefaultPhotoAction,
  // DefaultPhotoState
} from "../actions/defaultPhoto"

const defaultPhoto = (photo = "", action: GetDefaultPhotoAction) => {
  switch (action.type) {
    case GET_DEFAULT_PHOTO:
      return action.url
    default:
      return photo
  }
}

export default defaultPhoto