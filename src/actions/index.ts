import firebase from "../firebase-setup"

export default firebase

export const RESET_ALL: string = "RESET_ALL"
export const REFRESH_ALL: string = "REFRESH_ALL"

export const db: firebase.database.Database = firebase.database()
export const storage: firebase.storage.Storage = firebase.storage()

export const resetAll = () => {
  return { type: RESET_ALL }
}

export const refreshAll = () => {
  return { type: REFRESH_ALL }
}
