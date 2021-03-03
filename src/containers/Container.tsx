import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Sidebar from "../components/menu/Sidebar";

// import SetProfile from "../views/profile/SetProfile"
import SelectUser from "../views/chat/SelectUser";
// import UpdateProfile from "../views/profile/UpdateProfile"
// import DirectChat from "../views/chat/DirectChat"
// import SelectGroup from "../views/chat/SelectGroup"
// import GroupChat from "../views/chat/GroupChat"
// import CreateGroup from "../views/group/CreateGroup"
// import Notification from "../views/notification/Notification"

// import { resetAll } from "../actions"
import { getDefaultPhoto } from "../actions/defaultPhoto";
import { getCurrentUser, getCurrentUserId } from "../actions/currentUser"
import { getUsers } from "../actions/users"
import { getDirectChat } from "../actions/directChat"
import { getGroupChat } from "../actions/groupChat"
import { getGroups } from "../actions/groups"
import { getNotifications } from "../actions/notifications"

interface ContainerProps {
  currentUser: any;
  notificationCount: number;
  getDefaultPhoto: any;
  getCurrentUser: any;
  getCurrentUserId: any;
  getUsers: any;
  getDirectChat: any;
  getGroupChat: any;
  getGroups: any;
  getNotifications: any;
}

class Container extends Component<ContainerProps, {}> {
  componentDidMount() {
    console.log("containenr component");
    this.buildState()
    // this.props.getDefaultPhoto();
  }

  static defaultProps = {
    notificationCount: 0,
  };

  buildState() {
    this.props.getCurrentUser()
    this.props.getDefaultPhoto()
    this.props.getCurrentUserId()
    this.props.getUsers()
    this.props.getDirectChat()
    this.props.getGroupChat()
    this.props.getGroups()
    this.props.getNotifications()
  }

  // componentWillUnmount() {
  //   this.props.resetAll()
  // }

  isSetProfile() {
    return !!(this.props.currentUser && this.props.currentUser.displayName);
  }

  renderMain() {
    return (
      <React.StrictMode>
        <div className="flex-display">
          <Sidebar notificationCount={this.props.notificationCount} />
          <div className="relative-container">
            <Route exact path="/direct" component={SelectUser} />
            {/* <Route exact path="/direct/:userId" component={DirectChat} /> */}
            {/* <Route exact path="/groupchat" component={SelectGroup} />
            <Route exact path="/groupchat/:groupId" component={GroupChat} />
            <Route exact path="/update-profile" component={UpdateProfile} />
            <Route exact path="/creategroup" component={CreateGroup} />
            <Route exact path="/notification" component={Notification} /> */}
            <Route path="/">
              <Redirect to="/direct" />
            </Route>
          </div>
        </div>
      </React.StrictMode>
    );
  }

  renderProfile() {
    return (
      <React.StrictMode>
        {/* <Route
          exact
          path="/set-profile"
          render={(routeProps) => <SetProfile {...routeProps} />}
        /> */}
        <Route path="/">
          <Redirect to="/set-profile" />
        </Route>
      </React.StrictMode>
    );
  }

  render() {
    return (
      <React.StrictMode>
        {this.isSetProfile() ? this.renderMain() : this.renderProfile()}
      </React.StrictMode>
    );
  }
}

// const mapStateToProps = (state) => {
//   const notifications = state.notifications[state.currentUser.currentUserId] || {}
//   const notificationCount = (Object.keys(notifications) || []).length
//   return {
//     notificationCount,
//   }
// }

const mapDispatchToProps = {
  getCurrentUser,
  getCurrentUserId,
  getUsers,
  getDefaultPhoto,
  getDirectChat,
  getGroupChat,
  getGroups,
  getNotifications,
  // resetAll,
}

// const mapDispatchToProps = {
//   getDefaultPhoto,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Container);
export default connect(null, mapDispatchToProps)(Container);
// export default Container
