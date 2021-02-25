import React, { Component } from "react"
import { Link } from "react-router-dom"

class Sidebar extends Component {
  render() {
    return (
      <div className="bg-info sidebar">
        <ul className="sidebar-ul">
          <Link to="/signin">
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
