import firebase from "../firebase-setup"
import { db } from "./index"

export const GET_CURRENT_USER = "GET_CURRENT_USER_DATA"
export const GET_CURRENT_USER_ID = "GET_CURRENT_USER_ID"
export const RESET_CURRENT_USER = "RESET_CURRENT_USER"

export const getCurrentUser = () => async (dispatch) => {
  const uid = (await firebase.auth().currentUser.uid) || {}
  const currentUserRef = db.ref(`users/${uid}`)
  currentUserRef.on("value", (snapshot) => {
    const currentUser = snapshot.val()
    dispatch({ type: GET_CURRENT_USER, currentUser })
  })
}

export const getCurrentUserId = () => async (dispatch) => {
  const currentUser = (await firebase.auth().currentUser) || {}
  const currentUserId = currentUser.uid
  dispatch({ type: GET_CURRENT_USER_ID, currentUserId })
}
