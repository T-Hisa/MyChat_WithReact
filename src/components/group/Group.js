import React, { Component } from "react"
import { withRouter } from "react-router-dom"

class Group extends Component {
  onClickGroup() {
    this.props.history.push(`groupchat/${this.props.gid}`)
  }

  displayMemberNameList() {
    let displayWord = this.displayToolTip()
    if (displayWord.length > 16) {
      displayWord = displayWord.substr(0, 16)
      displayWord += " ..."
    }
    return displayWord
  }

  displayToolTip () {
    let displayWord = ""
    const memberIds = Object.keys(this.props.group.memberIds)
    memberIds.some(memberId => {
      const memberName = this.props.users[memberId].username
      displayWord += `${memberName} `
    })
    return displayWord
  }

  onClickEditBtn() {
    console.log(this.props)
    const {gid} = this.props
    this.props.history.push({
      pathname: `/creategroup`,
      gid: gid
    })
  }

  render() {
    return (
      <div data-bs-toggle="tooltip" data-bs-placement="top" title={this.displayToolTip()} className="group-container">
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
          <button onClick={this.onClickEditBtn.bind(this)} className="group-action-btn btn btn-outline-dark">編集</button>
          <button className="group-action-btn btn btn-outline-dark">削除</button>
        </div>
      </div>
    )
  }
}

export default withRouter(Group)