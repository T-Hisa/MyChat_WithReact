import firebase from "../firebase-setup"
export const db = firebase.database()
export const RESET_ALL = "RESET_ALLL"

export const resetAll = () => {
  return { type: RESET_ALL }
}
