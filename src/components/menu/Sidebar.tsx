import React, { Component } from "react"
import { Link } from "react-router-dom"
import Profile from "./Profile"

interface SidebarProps {
  notificationCount: number
}

class Sidebar extends Component<SidebarProps, {}> {
  renderMenu(text: string, path: string, flag: boolean): JSX.Element {
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

  render(): JSX.Element {
    return (
      <div className="bg-info sidebar">
        <Profile />
        <ul className="sidebar-ul">
          {this.renderMenu("個人チャット", "/direct", false)}
          {this.renderMenu("グループ", "/groupchat", false)}
          {this.renderMenu("通知", "/notification", true)}
          {this.renderMenu("グループ作成", "/creategroup", false)}
        </ul>
      </div>
    )
  }
}

export default Sidebar
