import React, { Component } from "react"
import { connect } from "react-redux"
import { deleteNotifications } from "../../actions/notifications"
import { devideByNoticeType } from "../../utils"

import NotificationDataProps from "../../types/models/Notification"
import RouteProps from "../../types/RouteProps"

interface NotificationProps extends RouteProps {
  currentUserId: any
  deleteNotifications: any
  groups: any
  users: any
  notifications: any
}

class Notification extends Component<NotificationProps, {}> {
  displayWord(nid: string): string {
    const { displayWord } = devideByNoticeType(
      this.getNoticeInfo(nid),
      this.props.users,
      this.props.groups,
      this.props.history
    )
    return displayWord
  }

  getNotificationIds(): Array<string> {
    return Object.keys(this.props.notifications)
  }

  getNoticeInfo(nid: string): NotificationDataProps  {
    return this.props.notifications[nid]
  }

  onClickNotice(nid: string): void {
    const { handleClickEvent } = devideByNoticeType(
      this.getNoticeInfo(nid),
      this.props.users,
      this.props.groups,
      this.props.history
    )
    handleClickEvent()
  }

  componentWillUnmount(): void {
    this.props.deleteNotifications({
      userId: this.props.currentUserId,
      notificationIds: this.getNotificationIds(),
    })
  }

  render(): JSX.Element {
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
    state.notifications[state.currentUser.currentUserId] || {}
  return {
    users: state.users,
    groups: state.groups,
    currentUserId: state.currentUser.currentUserId,
    notifications,
  }
}

const mapDispatchToProps = { deleteNotifications }

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
