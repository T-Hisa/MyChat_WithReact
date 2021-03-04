export default interface SendChat {
  currentUserId: string
  otherUserId?: string
  groupId?: string
  body: string
}