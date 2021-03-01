import React, { Component } from "react"
import { connect } from "react-redux"
import ChatForm from "../../components/chat/ChatForm"
import ChatSelf from "../../components/chat/ChatSelf"
import ChatOther from "../../components/chat/ChatOther"
import { renderImage } from "../../utils"
import { sendGroupChat } from "../../actions/groupChat"

class GroupChat extends Component {
  getGroupInfo() {
    const { groupId } = this.props.match.params
    return this.props.groups[groupId]
  }

  groupMemberIds() {
    return Object.keys(((this.getGroupInfo() || {}).memberIds) || [])
  }

  getUserInfo(userId) {
    return this.props.users[userId]
  }

  groupChatIds() {
    return Object.keys(this.props.groupChat || {}).reverse()
  }

  handleClickSendBtn(data) {
    this.props.sendGroupChat(data)
  }

  getChat(cid) {
    return this.props.groupChat[cid]
  }

  isMe(cid) {
    return this.getChat(cid).uid === this.props.currentUser.currentUserId
  }

  getChatUserInfo(cid) {
    const { uid } = this.getChat(cid)
    return this.props.users[uid]
  }

  renderChat(cid) {
    return (
      <div key={cid}>
        {this.isMe(cid) ? (
          <ChatSelf
            photoURL={this.props.currentUser.photoURL}
            defaultPhoto={this.props.defaultPhoto}
            body={this.getChat(cid).body}
          />
        ) : (
          <ChatOther
            photoURL={this.getChatUserInfo(cid).photoURL}
            defaultPhoto={this.props.defaultPhoto}
            body={this.getChat(cid).body}
          />
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="chat-whole-container">
        <div className="title-wrapper title-group">
          グループ
          <span className="name group-name">
            {(this.getGroupInfo() || {}).groupName}
          </span>
        </div>
        <div className="member-whole-wrapper">
          メンバー
          <ul className="member-wrapper">
            {this.groupMemberIds().map((mid) => (
              <div key={mid} className="user-detail">
                {this.getUserInfo(mid).photoURL
                  ? renderImage(this.getUserInfo(mid).photoURL)
                  : renderImage(this.props.defaultPhoto)}
                <span>{this.getUserInfo(mid).username}</span>
              </div>
            ))}
          </ul>
        </div>
        <div className="chat-whole-wrapper">
          {this.groupChatIds().map((cid) => this.renderChat(cid))}
        </div>

        <ChatForm
          groupId={this.props.match.params.groupId}
          handleClick={this.handleClickSendBtn.bind(this)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const groupChat = state.groupChat[props.match.params.groupId] || {}
  return {
    groups: state.groups,
    defaultPhoto: state.defaultPhoto,
    users: state.users,
    currentUser: state.currentUser,
    groupChat,
  }
}

const mapDispatchToProps = { sendGroupChat }

export default connect(mapStateToProps, mapDispatchToProps)(GroupChat)
