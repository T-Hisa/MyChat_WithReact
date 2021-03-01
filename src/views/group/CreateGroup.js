import React, { Component } from "react"
import { connect } from "react-redux"
import User from "../../components/user/User"

import { createGroup, updateGroup } from "../../actions/groups"

class CreateGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gid: "",
      groupName: "",
      errorMessage: "",
      errorFlag: false,
      selectUserIds: [],
    }
  }

  componentDidMount() {
    const gid = this.props.location.gid
    if (gid) {
      const group = this.props.groups[gid]
      const { groupName, memberIds } = group
      const selectUserIds = Object.keys(memberIds).filter(
        (uid) => uid !== this.props.currentUser.currentUserId
      )
      this.setState({ gid, groupName, selectUserIds })
    }
  }

  onInputGroupName(e) {
    const groupName = e.target.value
    const errorMessage = this.handleNameError(groupName)
    this.setState({ groupName, errorMessage })
  }

  candidateMemberIds() {
    return this.verifiedOtherUserIds().filter(
      (id) => !this.state.selectUserIds.includes(id)
    )
  }

  groupNameValidation() {
    return !!this.state.groupName && this.state.groupName.length < 20
  }

  handleNameError(groupName) {
    let errorMessage = ""
    if (!groupName) errorMessage = "入力してください"
    else if (groupName.length > 20)
      errorMessage = "20文字以内で入力してください"
    return errorMessage
  }

  checkBefore() {
    if (this.groupNameValidation()) {
      const value = {
        groupName: this.state.groupName,
        memberIds: {},
      }
      for (const uid of this.state.selectUserIds) {
        value.memberIds[uid] = 0
      }
      value.memberIds[this.props.currentUser.currentUserId] = 0
      return value
    }
    return false
  }

  onClickCreateGroupBtn() {
    const saveValue = this.checkBefore()
    if (saveValue) this.props.createGroup(saveValue)
  }

  onClickUpdateGroupBtn() {
    const updateValue = this.checkBefore()
    if (updateValue) {
      updateValue["gid"] = this.state.gid
      this.props.updateGroup(updateValue)
    }
  }

  onClickCancelBtn() {
    this.props.history.push("/groupchat")
  }

  onClickCandidateUser(userId) {
    const selectUserIds = this.state.selectUserIds
    this.setState({
      selectUserIds: [...selectUserIds, userId],
    })
  }

  onClickDeleteBtn(userId) {
    const selectUserIds = this.state.selectUserIds
    const index = selectUserIds.indexOf(userId)
    selectUserIds.splice(index, 1)
    this.setState({ selectUserIds })
  }

  verifiedOtherUserIds() {
    const otherUserIds =
      this.props.verifiedOtherUserIds.length > 0
        ? this.props.verifiedOtherUserIds
        : []
    return otherUserIds
  }

  renderMemberList(text, handleClick, handleDelete, memberIds) {
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
    )
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
            null,
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
    )
  }
}

const mapStateToProps = (state, props) => ({
  currentUser: state.currentUser,
  users: state.users,
  verifiedOtherUserIds: state.verifiedOtherUserIds,
  groups: state.groups,
})

const mapDispatchToProps = { createGroup, updateGroup }

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup)
