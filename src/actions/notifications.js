import { db } from "./index"
export const GET_NOTIFICATIONS = "GET_NOTIFICATIONS"
export const DELETE_NOTIFICATIONS = "DELETE_NOTIFICATIONS"

export const getNotifications = () => (dispatch) => {
  const notificationsRef = db.ref(`notifications`)
  notificationsRef.on("value", (snapshot) => {
    console.log('snapshot at notification action', snapshot)
    const response = snapshot.val()
    console.log('data at notification action', response)
    dispatch({ type: GET_NOTIFICATIONS, response })
  })
}

export const deleteNotifications = (data) => (dispatch) => {
  const { userId, notificationIds } = data
  const notificationsRef = db.ref(`notifications/${userId}`)
  for (const nid of notificationIds) {
    notificationsRef.child(nid).remove()
  }
}
