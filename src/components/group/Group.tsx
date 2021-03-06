import { Component } from "react";
import { withRouter } from "react-router-dom";

import GroupDataProps from "../../types/models/Group";
import RouteProps from "../../types/RouteProps";

import { UsersState } from "../../types/state";

interface GroupProps extends RouteProps {
  gid: string;
  group: GroupDataProps;
  users: UsersState;
}

class Group extends Component<GroupProps, {}> {
  onClickGroup(): void {
    this.props.history.push(`groupchat/${this.props.gid}`);
  }

  displayMemberNameList(): string {
    let displayWord: string = this.displayToolTip();
    if (displayWord.length > 16) {
      displayWord = displayWord.substr(0, 16);
      displayWord += " ...";
    }
    return displayWord;
  }

  displayToolTip(): string {
    let displayWord: string = "";
    const memberIds: Array<string> = Object.keys(this.props.group.memberIds);
    memberIds.forEach((memberId) => {
      const memberName: string = this.props.users![memberId].username;
      displayWord += `${memberName} `;
    });
    return displayWord;
  }

  onClickEditBtn(): void {
    const { gid } = this.props;
    this.props.history.push({
      pathname: `/creategroup`,
      gid: gid,
    });
  }

  render(): JSX.Element {
    return (
      <div
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={this.displayToolTip()}
        className="group-container"
      >
        <div onClick={this.onClickGroup.bind(this)} className="group-wrapper">
          <div className="group-name-wrapper">
            <span className="group-name-label">グループ名</span>
            <span className="group-name">{this.props.group.groupName}</span>
          </div>
          <div className="group-member-wrapper">
            <span className="member-name-label">メンバーリスト</span>
            <span>{this.displayMemberNameList()}</span>
          </div>
        </div>
        <div className="group-btn-wrapper">
          <button
            onClick={this.onClickEditBtn.bind(this)}
            className="group-action-btn btn btn-outline-dark"
          >
            編集
          </button>
          <button className="group-action-btn btn btn-outline-dark">
            削除
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Group);
