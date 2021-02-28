import React, { Component } from "react"
import { connect } from "react-redux"
import ChatForm from "./ChatForm"
import ChatSelf from "./ChatSelf"
import ChatOther from "./ChatOther"
import { getDirectChat } from "../../actions/directChat"

class DirectChat extends Component {
  componentDidMount() {
    console.log("props at DirectChat", this.props)
    this.props.getDirectChat(this.otherUserId())
  }

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
    return Object.keys(this.props.directChat || {})
  }

  renderImage(url) {
    return <img src={url} alt="サムネイル" />
  }

  isMe(cid) {
    return this.getChat(cid).which === "me"
  }

  getChat(cid) {
    console.log("directChat", this.props.directChat)
    console.log("directChat[cid]", this.props.directChat[cid])
    return this.props.directChat[cid]
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
        <ChatForm otherUserId={this.otherUserId()} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("state at directchat", state)
  return {
    users: state.users,
    defaultPhoto: state.defaultPhoto,
    directChat: state.directChat,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = { getDirectChat }

export default connect(mapStateToProps, mapDispatchToProps)(DirectChat)
