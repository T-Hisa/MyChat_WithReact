import React, { Component } from "react"
import { Route } from "react-router-dom"
import Sidebar from "../components/menu/Sidebar"
import SetProfile from "../components/Profile/SetProfile"

class Container extends Component {
  isSetProfile() {
    return !!(this.props.currentUser && this.props.currentUser.displayName)
  }

  renderMain() {
    return (
      <React.StrictMode>
        <div className="flex-display">
          <Sidebar />
        </div>
      </React.StrictMode>
    )
  }

  render() {
    return (
      <React.StrictMode>
        {this.isSetProfile() ? this.renderMain() : <SetProfile/> }
      </React.StrictMode>
    )
  }
}

export default Container
