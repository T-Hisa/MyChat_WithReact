import firebase from "../firebase-setup"
export interface BaseState {
  currentUser: any
  defaultPhoto: string
  directChat: any
  groups: any
  notifications: any
  users: any
  verifiedOtherUserIds: any
}

export const RESET_ALL = "RESET_ALL"

export const db = firebase.database()
export const storage = firebase.storage()

export const resetAll = () => {
  return { type: RESET_ALL }
}