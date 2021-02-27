import React, { Component } from "react"
import { Link } from "react-router-dom"
import Profile from "./Profile"

class Sidebar extends Component {
  render() {
    return (
      <div className="bg-info sidebar">
      <Profile
      />
        <ul className="sidebar-ul">
          <Link className="sidebar-anchor" to="/direct">
            <li className="menu-list">
              <span className="menu">個人チャット</span>
              <span className="arrow"></span>
            </li>
          </Link>
        </ul>
      </div>
    )
  }
}

export default Sidebar
