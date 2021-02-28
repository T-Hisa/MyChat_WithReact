import React, { Component } from "react"
import { Route, Redirect, withRouter } from "react-router-dom"
import { connect } from "react-redux"

import Sidebar from "../components/menu/Sidebar"
import SetProfile from "../components/Profile/SetProfile"
import UserSelect from "../components/chat/UserSelect"
import UpdateProfile from "../components/Profile/UpdateProfile"
import DirectChat from "../components/chat/DirectChat"
import SelectGroup from "../components/chat/SelectGroup"
import GroupChat from "../components/chat/GroupChat"
import CreateGroup from "../components/group/CreateGroup"
import Notification from "../components/notification/Notification"

import { getDefaultPhoto } from "../actions/defaultPhoto"
import { getCurrentUser, getCurrentUserId } from "../actions/currentUser"
import { getUsers } from "../actions/users"
import { getDirectChat } from "../actions/directChat"
import { getGroupChat } from "../actions/groupChat"
import { getGroups } from "../actions/groups"

class Container extends Component {
  // constructor(props) {
  //   super(props)
  //   console.log("container props", props)
  // }

  componentDidMount() {
    console.log("Container component did mount!")
    this.props.getCurrentUser()
    this.props.getDefaultPhoto()
    this.props.getCurrentUserId()
    this.props.getUsers()
    this.props.getDirectChat()
    this.props.getGroupChat()
    this.props.getGroups()
  }

  // componentWillUnmount() {
  //   this.props.resetAll()
  // }

  isSetProfile() {
    console.log(
      "isSetProfile",
      !!(this.props.currentUser && this.props.currentUser.username)
    )
    return !!(this.props.currentUser && this.props.currentUser.username)
  }

  renderMain() {
    return (
      <React.StrictMode>
        <div className="flex-display">
          <Sidebar />
          <div className="relative-container">
            <Route exact path="/direct" component={UserSelect} />
            <Route exact path="/direct/:userId" component={DirectChat} />
            <Route exact path="/groupchat" component={SelectGroup} />
            <Route exact path="/groupchat/:groupId" component={GroupChat} />
            <Route exact path="/update-profile" component={UpdateProfile} />
            <Route exact path="/creategroup" component={CreateGroup} />
            <Route exact path="/notification" component={Notification} />
            <Route path="/">
              <Redirect to="/direct" />
            </Route>
          </div>
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
const mapDispatchToProps = {
  getCurrentUser,
  getCurrentUserId,
  getUsers,
  getDefaultPhoto,
  getDirectChat,
  getGroupChat,
  getGroups,
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Container)
)
