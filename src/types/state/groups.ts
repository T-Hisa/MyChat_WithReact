import GroupProps from "../models/Group"

export default interface GroupsState {
  [groupId: string]: GroupProps
}