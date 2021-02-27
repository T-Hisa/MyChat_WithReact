import firebase from "../firebase-setup"
// const db = firebase.database()

export const GET_CURRENT_USER = "GET_CURRENT_USER_DATA"
export const GET_CURRENT_USER_ID = "GET_CURRENT_USER_ID"
export const RESET_CURRENT_USER = "RESET_CURRENT_USER"

export const getCurrentUser = () => (dispatch) => {
  firebase.auth().onAuthStateChanged(currentUser => {
    dispatch({ type: GET_CURRENT_USER, currentUser })
  })
  // const currentUser = await firebase.auth().onAuthStateChanged
  // dispatch({ type: GET_CURRENT_USER, currentUser })
}

export const getCurrentUserId = () => async (dispatch) => {
  const currentUser = await firebase.auth().currentUser || {}
  const currentUserId = currentUser.uid
  console.log("getCurrentUserId")
  dispatch({ type: GET_CURRENT_USER_ID, currentUserId })
}
