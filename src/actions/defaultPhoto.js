import firebase from "../firebase-setup"
export const GET_DEFAULT_PHOTO = "GET_DEFAULT_PHOTO"
// let url
// const storage = firebase.storage()
// storage
//   .ref("default.png")
//   .getDownloadURL()
//   .then((defaultPhotoURL) => {
//     url = defaultPhotoURL
//   })

export const getDefaultPhoto = () => (dispatch) => {
  const storage = firebase.storage()
  storage
    .ref("default.png")
    .getDownloadURL().then(url => {
      dispatch({ type: GET_DEFAULT_PHOTO, url })
    })
}
