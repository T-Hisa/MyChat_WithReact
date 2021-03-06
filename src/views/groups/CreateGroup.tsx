import React, { Component, KeyboardEvent } from "react";
import { connect } from "react-redux";
import User from "../../components/user/User";

import { createGroup, updateGroup } from "../../actions/groups";
import { handleNameError } from "../../utils";

import GroupDataProps from "../../types/models/Group";
import RouteProps from "../../types/RouteProps";
import UpdateGroupProps from "../../types/UpdateGroup";
import BaseState, {
  CurrentUserState,
  GroupsState,
  UsersState,
  VerifiedOtherUserIdsState,
} from "../../types/state";

interface MapStateToProps {
  currentUser: CurrentUserState;
  currentUserId: string;
  groups: GroupsState;
  users: UsersState;
  verifiedOtherUserIds: VerifiedOtherUserIdsState;
}

interface MapDispatchToProps {
  createGroup: (data: GroupDataProps) => void
  updateGroup: (data: UpdateGroupProps) => void
}

type CreateGroupProps = RouteProps & MapStateToProps & MapDispatchToProps

interface CreateGroupState {
  errorFlag: boolean;
  errorMessage: string;
  groupName: string;
  gid: string;
  selectUserIds: Array<string>;
}

class CreateGroup extends Component<CreateGroupProps, CreateGroupState> {
  constructor(props: CreateGroupProps) {
    super(props);
    this.state = {
      gid: "",
      groupName: "",
      errorMessage: "入力してください",
      errorFlag: false,
      selectUserIds: [],
    };
  }

  componentDidMount(): void {
    const gid: string = this.props.location.gid;
    if (gid && this.props.groups) {
      const group: GroupDataProps = this.props.groups[gid];
      const { groupName, memberIds } = group;
      const selectUserIds: Array<string> = Object.keys(memberIds).filter(
        (uid) => uid !== this.props.currentUserId
      );
      this.setState({ gid, groupName, selectUserIds });
    }
  }

  onInputGroupName(e: KeyboardEvent<HTMLInputElement>): void {
    const groupName: string = e.currentTarget.value;
    const errorMessage: string = handleNameError(groupName, 20);
    this.setState({ groupName, errorMessage });
  }

  candidateMemberIds(): Array<string> {
    return this.verifiedOtherUserIds().filter(
      (id) => !this.state.selectUserIds.includes(id)
    );
  }

  groupNameValidation(): boolean {
    return !!this.state.groupName && this.state.groupName.length < 20;
  }

  getSendData(): GroupDataProps {
    const value: GroupDataProps = {
      groupName: this.state.groupName,
      memberIds: {},
    };
    for (const uid of this.state.selectUserIds) {
      value.memberIds[uid] = 0;
    }
    value.memberIds[this.props.currentUserId!] = 0;
    return value;
  }

  onClickCreateGroupBtn(): void {
    if (this.groupNameValidation()) {
      const saveValue: GroupDataProps = this.getSendData();
      this.props.createGroup(saveValue);
    } else alert("グループ名を" + this.state.errorMessage);
  }

  onClickUpdateGroupBtn(): void {
    if (this.groupNameValidation()) {
      const updateValue: UpdateGroupProps = this.getSendData();
      updateValue["gid"] = this.state.gid;
      this.props.updateGroup(updateValue);
    } else {
      alert("グループ名を" + this.state.errorMessage);
    }
  }

  onClickCancelBtn(): void {
    this.props.history.push("/groupchat");
  }

  onClickCandidateUser(userId: string): void {
    const selectUserIds: Array<string> = this.state.selectUserIds;
    this.setState({
      selectUserIds: [...selectUserIds, userId],
    });
  }

  onClickDeleteBtn(userId: string): void {
    const { selectUserIds } = this.state;
    const index: number = selectUserIds.indexOf(userId);
    selectUserIds.splice(index, 1);
    this.setState({ selectUserIds });
  }

  verifiedOtherUserIds(): Array<string> {
    let otherUserIds: Array<string> = [];
    if (this.props.verifiedOtherUserIds) {
      otherUserIds = this.props.verifiedOtherUserIds;
    }
    return otherUserIds;
  }

  renderMemberList(
    text: string,
    handleClick: (data: string) => void,
    handleDelete: ((data: string) => void) | undefined,
    memberIds: Array<string>
  ) {
    return (
      <div className="whole-member-list">
        <p className="member-title">{text}</p>
        <ul className="member-list-container">
          {memberIds.map((uid) => (
            <User
              userId={uid}
              key={uid}
              handleClickUser={handleClick}
              handleClickDelete={handleDelete}
            />
          ))}
        </ul>
      </div>
    );
  }

  render() {
    return (
      <React.StrictMode>
        <div className="create-group-container bg-skyblue">
          <form className="form-container group-form-container">
            <div className="form-group form-wrapper">
              <label className="group-label" htmlFor="group-name">
                グループ名
                {this.state.errorMessage && this.state.errorFlag && (
                  <span className="text-danger font-weight-bold">
                    {this.state.errorMessage}
                  </span>
                )}
              </label>
              <input
                onInput={this.onInputGroupName.bind(this)}
                type="text"
                className="form-control"
                value={this.state.groupName}
              />
            </div>
          </form>
          {this.renderMemberList(
            "グループメンバーリスト",
            () => {},
            this.onClickDeleteBtn.bind(this),
            this.state.selectUserIds
          )}
          {this.renderMemberList(
            "メンバー選択",
            this.onClickCandidateUser.bind(this),
            undefined,
            this.candidateMemberIds()
          )}
          <div className="group-create-btn-wrapper">
            {this.state.gid ? (
              <div className="btn-wrapper">
                <button
                  onClick={this.onClickCancelBtn.bind(this)}
                  className="btn btn-outline-secondary"
                >
                  取り消す
                </button>
                <button
                  onClick={this.onClickUpdateGroupBtn.bind(this)}
                  className="btn btn-dark"
                >
                  グループ更新
                </button>
              </div>
            ) : (
              <button
                onClick={this.onClickCreateGroupBtn.bind(this)}
                className="btn btn-dark"
              >
                グループ作成
              </button>
            )}
          </div>
        </div>
      </React.StrictMode>
    );
  }
}

const mapStateToProps = (state: BaseState): MapStateToProps => ({
  currentUser: state.currentUser,
  currentUserId: state.currentUserId,
  groups: state.groups,
  users: state.users,
  verifiedOtherUserIds: state.verifiedOtherUserIds,
});

const mapDispatchToProps: MapDispatchToProps = { createGroup, updateGroup };

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
