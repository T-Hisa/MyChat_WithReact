import UserProps from "../models/User";

export default interface CurrentUserState extends UserProps {
  currentUserId: string;
}
