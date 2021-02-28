import { db } from "./index"

export const GET_USERS = "GET_USERS"
export const SET_PROFILE = "SET_PROFILE"
export const GET_CURRENT_USER_DATA = "GET_CURRENT_USER_DATA"
export const GET_CURRENT_USER_ID = "GET_CURRENT_USER_ID"

export const updateUserProfile = (data) => (dispatch) => {
  const { userId } = data
  const usersRef = db.ref(`users/${userId}`)
  const updateData = {
    username: data.username,
    photoURL: data.photoURL,
  }
  usersRef.update(updateData)
}

export const setUserProfile = (data) => (dispatch) => {
  const { uid, email } = data
  const usersRef = db.ref(`users/${uid}`)
  usersRef.set({ email })
}

export const getUsers = () => (dispatch) => {
  const usersRef = db.ref("users")
  // console.log("usersRef", usersRef)
  // const response = await usersRef.once("value")
  // console.log("response at action", response)
  // dispatch({ type: GET_USERS, response })

  usersRef.on("value", (snapshot) => {
    console.log("snapshot at action", snapshot)
    const response = snapshot.val()
    console.log("response at action", response)
    dispatch({ type: GET_USERS, response })
  })

  // usersRef.on("value").then(snapshot => {
  //   console.log("snapshot", snapshot)
  //   const response = snapshot.val()
  //   dispatch({ type: GET_USERS, response })
  // })
}