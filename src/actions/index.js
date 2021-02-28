import firebase from "../firebase-setup"
export const db = firebase.database()

export const INCREMENT = "INCREMENT"

export const sampleAction = () => {
  return {
    type: INCREMENT,
  }
}
// export const sampleAction = () => ({
//   type: INCREMENT
// })

export const getDirectChatData = (userId) => async (dispatch) => {
  const chatDirectRef = db.ref(`chat/direct/${userId}`)
  chatDirectRef.on("value", (snapshot) => {
    const response = snapshot.val()
    dispatch({ type: "GET_CHAT_DIRECT", response })
  })
}

export const getGroupChatData = (groupId) => async (dispatch) => {
  const chatGroupRef = db.ref(`chat/group/${groupId}`)
  chatGroupRef.on("value", (snapshot) => {
    const response = snapshot.val()
    dispatch({ type: "GET_CHAT_GROUP", response })
  })
}
