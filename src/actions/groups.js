import { db } from "./index"
export const GET_GROUPS = "GET_GROUPS"
export const CREATE_GROUP = "CREATE_GROUP"

export const getGroups = () => (dispatch) => {
  const groupRef = db.ref("groups")
  groupRef.on("value", (snapshot) => {
    const response = snapshot.val()
    dispatch({ type: GET_GROUPS, response })
  })
}

export const createGroup = (data) => {
  const groupRef = db.ref("groups")
  const newKey = groupRef.push().key
  groupRef.child(newKey).update(data)
  return { type: CREATE_GROUP }
}
