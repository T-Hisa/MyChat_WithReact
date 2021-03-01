import React, { Component } from "react"
import { connect } from "react-redux"
import { deleteNotifications } from "../../actions/notifications"

class Notification extends Component {
  displayWord(nid) {
    const {displayWord} = this.devideByType(nid)
    return displayWord
  }

  devideByType(nid) {
    let fromName, displayWord, handleClickEvent
    const notice = this.getNoticeInfo(nid)
    const {type, fromId} = notice
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
      return {fromName, displayWord, handleClickEvent}
   }

  getNotificationIds() {
    return Object.keys(this.props.notifications)
  }

  getNoticeInfo(nid) {
    return this.props.notifications[nid]
  }

  onClickNotice(nid) {
    const {handleClickEvent} = this.devideByType(nid)
    handleClickEvent()
  }

  componentWillUnmount() {
    this.props.deleteNotifications({
      userId: this.props.currentUserId,
      notificationIds: this.getNotificationIds()
    })
  }

  render() {
    return (
      <div className="notification-container">
        <div>
          {
            this.getNotificationIds().length > 0 ?
              this.getNotificationIds().map((nid) => (
                <div
                  onClick={() => { this.onClickNotice(nid)}}
                  className="notification-wrapper"
                  key={nid}
                >
                  <div>
                    <span>{this.displayWord(nid)}</span>
                  </div>
                </div>
              )) :
              <div className="no-notice">
                通知は届いていません
              </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state at nottification', state)
  const notifications = state.notifications[state.currentUser.currentUserId] || {}
  return {
    users: state.users,
    groups: state.groups,
    currentUserId: state.currentUser.currentUserId,
    notifications
  }
}

const mapDispatchToProps = { deleteNotifications }

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
