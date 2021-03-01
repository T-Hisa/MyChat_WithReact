import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import {connect} from "react-redux"

class NotificationCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayWord: "",
      handleClickEvent: () => {},
    }
  }

  componentDidMount() {
    this.devideByType()
  }

  devideByType() {
    let fromName, displayWord, handleClickEvent
    const notice = this.props.notice
    const { type, fromId } = notice
    switch (type) {
      case "chat-direct":
        fromName = this.props.users[fromId].username
        displayWord = fromName + "からチャットが届いています"
        handleClickEvent = () => {
          this.props.history.push(`/direct/${fromId}`)
        }
        break
      case "chat-group":
        fromName = (this.props.groups[fromId] || {}).groupName
        displayWord = fromName + "でチャットがありました"
        handleClickEvent = () => {
          this.props.history.push(`/groupchat/${fromId}`)
        }
        break
      case "entry-group":
        fromName = (this.props.groups[fromId] || {}).groupName
        displayWord = "グループ「" + fromName + "」に参加しました"
        handleClickEvent = () => {
          this.props.history.push(`/groupchat/${fromId}`)
        }
        break
      case "leave-gruop":
        fromName = (this.props.groups[fromId] || {}).groupName
        displayWord = "グループ「" + fromName + "」から退出しました"
        handleClickEvent = () => {
          this.props.history.push("/groupchat")
        }
        break
      case "delete-group":
        fromName = (this.props.groups[fromId] || {}).groupName
        displayWord = "グループ「" + fromName + "」が削除されました"
        handleClickEvent = () => {
          this.props.history.push("/groupchat")
        }
        break
      default:
        break
    }
    this.setState({ displayWord, handleClickEvent })
  }


  render() {
    return (
      <div className="notify-dropdown">
        <div
          className="type-wrapper"
          onClick={this.state.handleClickEvent.bind(this)}
        >
          {this.state.displayWord}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({ users: state.users, groups: state.groups })
export default withRouter(connect(mapStateToProps, null)(NotificationCard))
