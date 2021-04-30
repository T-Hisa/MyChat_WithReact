import React, { Component } from "react"
import { connect } from "react-redux"
import { deleteNotifications } from "../../actions/notifications"
import { devideByNoticeType } from "../../utils"

class Notification extends Component {
  displayWord(nid) {
    const { displayWord } = devideByNoticeType(
      this.getNoticeInfo(nid),
      this.props.users,
      this.props.groups,
      this.props.history
    )
    return displayWord
  }

  getNotificationIds() {
    return Object.keys(this.props.notifications)
  }

  getNoticeInfo(nid) {
    return this.props.notifications[nid]
  }

  onClickNotice(nid) {
    const { handleClickEvent } = devideByNoticeType(
      this.getNoticeInfo(nid),
      this.props.users,
      this.props.groups,
      this.props.history
    )
    handleClickEvent()
  }

  componentWillUnmount() {
    this.props.deleteNotifications({
      userId: this.props.currentUserId,
      notificationIds: this.getNotificationIds(),
    })
  }

  render() {
    return (
      <div className="notification-container">
        <div>
          {this.getNotificationIds().length > 0 ? (
            this.getNotificationIds().map((nid) => (
              <div
                onClick={() => {
                  this.onClickNotice(nid)
                }}
                className="notification-wrapper"
                key={nid}
              >
                <div>
                  <span>{this.displayWord(nid)}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-notice">通知は届いていません</div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const notifications =
    state.notifications && state.notifications[state.currentUser.currentUserId] || {}
  return {
    users: state.users,
    groups: state.groups,
    currentUserId: state.currentUser.currentUserId,
    notifications,
  }
}

const mapDispatchToProps = { deleteNotifications }

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
