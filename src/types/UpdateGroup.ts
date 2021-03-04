import Group from "./models/Group";
import GroupProps from "./models/Group"

export default interface UpdateGroupProps extends GroupProps {
  gid?: string
}