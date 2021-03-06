import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "../firebase-setup";

import Sidebar from "../components/menu/Sidebar";

import SetProfile from "../views/profile/SetProfile";
import SelectUser from "../views/chat/SelectUser";
import UpdateProfile from "../views/profile/UpdateProfile";
import DirectChat from "../views/chat/DirectChat";
import SelectGroup from "../views/chat/SelectGroup";
import GroupChat from "../views/chat/GroupChat";
import CreateGroup from "../views/groups/CreateGroup";
import Notification from "../views/notification/Notification";

import { resetAll } from "../actions";
import { getDefaultPhoto } from "../actions/defaultPhoto";
import { getCurrentUser, getCurrentUserId } from "../actions/currentUser";
import { getUsers } from "../actions/users";
import { getDirectChat } from "../actions/directChat";
import { getGroupChat } from "../actions/groupChat";
import { getGroups } from "../actions/groups";
import { getNotifications } from "../actions/notifications";

import RouteProps from "../types/RouteProps";
import BaseState, { NotificationsProps } from "../types/state";

interface MapStateToProps {
  notificationCount: number;
}

interface MapDispatchToProps {
  getCurrentUser: () => void;
  getCurrentUserId: () => void;
  getDefaultPhoto: () => void;
  getDirectChat: () => void;
  getGroupChat: () => void;
  getGroups: () => void;
  getNotifications: () => void;
  getUsers: () => void;
  resetAll: () => void;
}

interface ContainerProps extends MapStateToProps, MapDispatchToProps {
  currentUser: firebase.User;
}

class Container extends Component<ContainerProps, {}> {
  componentDidMount(): void {
    this.buildState();
  }

  buildState(): void {
    this.props.getCurrentUser();
    this.props.getCurrentUserId();
    this.props.getDefaultPhoto();
    this.props.getDirectChat();
    this.props.getGroupChat();
    this.props.getGroups();
    this.props.getNotifications();
    this.props.getUsers();
  }

  componentWillUnmount(): void {
    this.props.resetAll();
  }

  isSetProfile(): boolean {
    return !!(this.props.currentUser && this.props.currentUser.displayName);
  }

  renderMain(): JSX.Element {
    return (
      <React.StrictMode>
        <div className="flex-display">
          <Sidebar notificationCount={this.props.notificationCount!} />
          <div className="relative-container">
            <Route exact path="/direct" component={SelectUser} />
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
    );
  }

  renderProfile(): JSX.Element {
    return (
      <React.StrictMode>
        <Route
          exact
          path="/set-profile"
          render={(routeProps: RouteProps) => <SetProfile {...routeProps} />}
        />
        <Route path="/">
          <Redirect to="/set-profile" />
        </Route>
      </React.StrictMode>
    );
  }

  render(): JSX.Element {
    return (
      <React.StrictMode>
        {this.isSetProfile() ? this.renderMain() : this.renderProfile()}
      </React.StrictMode>
    );
  }
}

const mapStateToProps = (state: BaseState): MapStateToProps => {
  let notifications: NotificationsProps;
  let notificationCount: number;
  // let currentUser: CurrentUserState
  if (state.notifications && state.currentUser) {
    notifications = state.notifications;
    notificationCount = Object.keys(notifications).length;
  } else {
    notificationCount = 0;
  }
  return { notificationCount };
};

const mapDispatchToProps: MapDispatchToProps = {
  getCurrentUser,
  getCurrentUserId,
  getDefaultPhoto,
  getDirectChat,
  getGroupChat,
  getGroups,
  getNotifications,
  getUsers,
  resetAll,
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
