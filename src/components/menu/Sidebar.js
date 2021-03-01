import React, { Component } from "react"
import { Link } from "react-router-dom"
import Profile from "./Profile"

class Sidebar extends Component {
  renderMenu(text, path, flag) {
    return (
      <Link className="sidebar-anchor" to={path}>
        <li className="menu-list">
          <span className="menu">{text}</span>
          {
            flag && this.props.notificationCount > 0 && (
              <span className="badge bg-danger badge-custom">
                {this.props.notificationCount}
              </span>
            )
          }
          <span className="arrow"></span>
        </li>
      </Link>
    )
  }

  render() {
    return (
      <div className="bg-info sidebar">
        <Profile />
        <ul className="sidebar-ul">
          {this.renderMenu("個人チャット", "/direct")}
          {this.renderMenu("グループ", "/groupchat")}
          {this.renderMenu("通知", "/notification", true)}
          {this.renderMenu("グループ作成", "/creategroup")}
        </ul>
      </div>
    )
  }
}

export default Sidebar
