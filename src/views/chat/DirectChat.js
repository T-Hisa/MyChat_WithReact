import React, { Component } from "react"
import { connect } from "react-redux"
import ChatForm from "../../components/chat/ChatForm"
import ChatSelf from "../../components/chat/ChatSelf"
import ChatOther from "../../components/chat/ChatOther"
import { sendDirectChat } from "../../actions/directChat"

class DirectChat extends Component {
  userInfo() {
    return this.props.users[this.otherUserId()]
  }

  otherUserId() {
    return this.props.match.params.userId
  }

  currentUserInfo() {
    return this.props.currentUser
  }

  directChatIds() {
    return Object.keys(this.props.directChat || {}).reverse()
  }

  renderImage(url) {
    return <img src={url} alt="サムネイル" />
  }

  isMe(cid) {
    return this.getChat(cid).which === "me"
  }

  getChat(cid) {
    return this.props.directChat[cid]
  }

  handleClicKSendBtn(data) {
    this.props.sendDirectChat(data)
  }

  renderChat(cid) {
    return (
      <div key={cid}>
        {
          this.isMe(cid) ?
            <ChatSelf
              photoURL={this.currentUserInfo().photoURL}
              defaultPhoto={this.props.defaultPhoto}
              body={this.getChat(cid).body}
            /> :
            <ChatOther
              photoURL={this.userInfo().photoURL}
              defaultPhoto={this.props.defaultPhoto}
              body={this.getChat(cid).body}
            />
        }
      </div>
    )
  }

  render() {
    return (
      <div className="chat-whole-container">
        <div className="title-wrapper">
          ユーザー:
          <div className="user-wrapper">
            {this.userInfo().photoURL
              ? this.renderImage(this.userInfo().photoURL)
              : this.renderImage(this.props.defaultPhoto)}
            <span className="name">{this.userInfo().username}</span>
          </div>
        </div>
        <div className="chat-whole-wrapper">
          {
            this.directChatIds().map(cid => this.renderChat(cid))
          }
        </div>
        <ChatForm otherUserId={this.otherUserId()} handleClick={this.handleClicKSendBtn.bind(this)} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const {currentUserId} = state.currentUser
  const otherUserId = props.match.params.userId
  const directChat = (state.directChat[currentUserId] || {})[otherUserId] || {}
  return {
    users: state.users,
    defaultPhoto: state.defaultPhoto,
    directChat,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = { sendDirectChat }

export default connect(mapStateToProps, mapDispatchToProps)(DirectChat)
