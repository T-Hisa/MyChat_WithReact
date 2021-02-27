import React, { Component } from "react"
import { Route, Redirect, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import Sidebar from "../components/menu/Sidebar"
import SetProfile from "../components/Profile/SetProfile"
import UserSelect from "../components/chat/UserSelect"
import UpdateProfile from "../components/Profile/UpdateProfile"

import { getCurrentUser } from "../actions/currentUser"

class Container extends Component {
  constructor(props) {
    super(props)
    console.log("container props", props)
  }

  componentDidMount() {
    console.log("Container component did mount!")
    // console.log("isSetProfile")
  }

  isSetProfile() {
    console.log(
      "isSetProfile",
      !!(this.props.currentUser && this.props.currentUser.displayName)
    )
    return !!(this.props.currentUser && this.props.currentUser.displayName)
  }

  renderMain() {
    return (
      <React.StrictMode>
        <div className="flex-display">
          <Sidebar />
          <Route
            exact
            path="/direct"
            render={(routeProps) => {
              ;<UserSelect />
            }}
          />
          <Route
            exact
            path="/update-profile"
            component={UpdateProfile}
          />
          <Route path="/">
            <Redirect to="/direct" />
          </Route>
        </div>
      </React.StrictMode>
    )
  }

  renderProfile() {
    return (
      <React.StrictMode>
        <Route
          exact
          path="/set-profile"
          render={(routeProps) => <SetProfile {...routeProps} />}
        />
        <Route path="/">
          <Redirect to="/set-profile" />
        </Route>
      </React.StrictMode>
    )
  }

  render() {
    return (
      <React.StrictMode>
        {this.isSetProfile() ? this.renderMain() : this.renderProfile()}
        {/* {this.isSetProfile() ? this.renderMain() : <SetProfile/> } */}
      </React.StrictMode>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("state at container", state)
  return { currentUser: state.currentUser }
}
const mapDispatchToProps = { getCurrentUser }

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Container)
)
