export default interface GroupProps {
  groupName: string
  memberIds: {
    [memberId: string]: 0
  }
  isDelete?: boolean
}