import UserProps from "../models/User"

export default interface UsersState {
  [userId: string]: UserProps;
}