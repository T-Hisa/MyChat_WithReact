import React, { Component } from "react"
import { Link } from "react-router-dom"
import Profile from "./Profile"

class Sidebar extends Component {
  renderMenu(text, path) {
    return (
      <Link className="sidebar-anchor" to={path}>
        <li className="menu-list">
          <span className="menu">{text}</span>
          <span className="arrow"></span>
        </li>
      </Link>
    )
  }

  render() {
    return (
      <div className="bg-info sidebar">
      <Profile
      />
        <ul className="sidebar-ul">
          {this.renderMenu('個人チャット', "/direct")}
          {this.renderMenu('グループ', "/groupchat")}
          {this.renderMenu('通知', "direct")}
          {this.renderMenu('グループ作成', "creategroup")}
        </ul>
      </div>
    )
  }
}

export default Sidebar
