import { db } from "./index"

export const GET_GROUP_CHAT = "GET_GROUP_CHAT"
export const SEND_GROUP_CHAT = "SEND_GROUP_CHAT"

export const getGroupChat = () => (dispatch) => {
  const groupChatRef = db.ref("chat/groups")
  groupChatRef.on("value", (snapshot) => {
    const data = snapshot.val()
    dispatch({ type: GET_GROUP_CHAT, data })
  })
}

export const sendGroupChat = (data) => {
  const { groupId, body, currentUserId } = data
  const timestamp = new Date().getTime()
  const saveData = { body, timestamp, uid: currentUserId }
  const groupChatRef = db.ref(`chat/groups/${groupId}`)
  const newKey: string = groupChatRef.push().key ?? ""
  groupChatRef.child(newKey).set(saveData)
  return { type: SEND_GROUP_CHAT }
}
