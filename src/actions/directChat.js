import firebase from "../firebase-setup"
import { db } from "./index"

export const GET_DIRECT_CHAT = "GET_DIRECT_CHAT"
export const SEND_DIRECT_CHAT = "SEND_DIRECT_CHAT"

export const getDirectChat = (uid) => async (dispatch) => {
  const currentUserId = await firebase.auth().currentUser.uid || ""
  const directChatRef = db.ref(`chat/direct/${currentUserId}/${uid}`)
  // const directChatRef = db.ref("chat/direct")
  directChatRef.on("value", (snapshot) => {
    const data = snapshot.val()
    console.log("data at getDirectChat", data)
    dispatch({ type: GET_DIRECT_CHAT, data })
  })
}

export const sendDirectChat = (data) => {
  const { currentUserId, otherUserId, body } = data
  const which = "me"
  const timestamp = new Date().getTime()
  const saveData = { body, which, timestamp }
  const directChatRef = db.ref(`chat/direct/${currentUserId}/${otherUserId}`)
  const newKey = directChatRef.push().key
  directChatRef.child(newKey).set(saveData)
  console.log("ssaveData at sendDirect", saveData)
  return { type: SEND_DIRECT_CHAT }
}
