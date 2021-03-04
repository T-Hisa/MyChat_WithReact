export default interface UserProps {
  username: string
  email: string
  photoURL?: string
  groupIds?: {
    [gid: string]: 0
  }
}