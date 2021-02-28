import React, { Component } from "react"
import { connect } from "react-redux"

class Notification extends Component {
  render() {
    return (
      <div className="notification-container">
        <div>
          <div className="notification-wrapper">
            <div>
              <span>通知の種類に応じて変化するワード</span>
            </div>
          </div>
        </div>
        通知は届いていません
      </div>
    )
  }
}

export default connect(null, null)(Notification)