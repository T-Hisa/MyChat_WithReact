import { Component, KeyboardEvent } from "react";
import { connect } from "react-redux";
import Group from "../../components/group/Group";

import BaseState, {
  UsersState,
  CurrentUserState,
  GroupsState,
  GroupsProps
} from "../../types/state";

interface MapStateToProps {
  currentUser: CurrentUserState;
  groups: GroupsState;
  users: UsersState;
}

type SelectGroupProps = MapStateToProps

interface SelectGroupState {
  searchParams: string;
}

class SelectGroup extends Component<SelectGroupProps, SelectGroupState> {
  constructor(props: SelectGroupProps) {
    super(props);
    this.state = {
      searchParams: "",
    };
  }

  onInputSearchField(e: KeyboardEvent<HTMLInputElement>): void {
    const searchParams: string = e.currentTarget.value;
    this.setState({ searchParams });
  }

  searchGroupIds(): Array<string> {
    const belongingGroupIds: Array<string> = this.getBelengingGroupIds();
    return belongingGroupIds.filter((gid) => {
      const groupName: string = this.props.groups![gid].groupName;
      return groupName.indexOf(this.state.searchParams) > -1;
    });
  }

  getGroupIdsFlexibly(): Array<string> {
    if (this.state.searchParams) return this.searchGroupIds();
    else return this.getBelengingGroupIds();
  }

  getBelengingGroupIds(): Array<string> {
    const groups: GroupsProps = this.props.groups ?? {}
    const wholeGroupIds: Array<string> = Object.keys(groups);
    const belongingGroupIds: Array<string> = wholeGroupIds.filter((gid) => {
      const currentUserId = this.props.currentUser?.currentUserId!
      return Object.keys((groups[gid] || {}).memberIds).includes(currentUserId);
    });
    return belongingGroupIds;
  }

  renderGroups(): JSX.Element {
    return (
      <ul className="group-list-wrapper">
        {this.getGroupIdsFlexibly().length > 0 ? (
          this.getGroupIdsFlexibly().map((gid) => (
            <li key={gid} className="group-list">
              <Group
                group={this.props.groups![gid]}
                gid={gid}
                users={this.props.users}
              />
            </li>
          ))
        ) : (
          <div className="no-group">検索にヒットしたグループはありません</div>
        )}
      </ul>
    );
  }

  render(): JSX.Element {
    return (
      <div className="group-select-wrapper">
        <span className="group-title">グループ選択</span>
        <input
          type="text"
          className="group-search-field"
          placeholder="グループ検索"
          onInput={this.onInputSearchField.bind(this)}
        />
        {this.getBelengingGroupIds().length === 0 ? (
          <div className="no-group">所属しているグループはありません</div>
        ) : (
          this.renderGroups()
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: BaseState): MapStateToProps => ({
  groups: state.groups,
  currentUser: state.currentUser,
  users: state.users,
});
export default connect(mapStateToProps)(SelectGroup);
