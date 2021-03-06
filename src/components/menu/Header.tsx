import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "../../firebase-setup";
import { deleteNotifications } from "../../actions/notifications";
import NotificationCard from "./NotificationCard";

import DeleteNotificationsData from "../../types/DeleteNotifications"
import NoticeProps from "../../types/models/Notification";
import BaseState, {
  NotificationsState,
  CurrentUserState,
} from "../../types/state";

interface MapStateToProps {
  notifications: NotificationsState
  currentUserId: string
  currentUser: CurrentUserState
}

interface MapDispatchToProps {
  deleteNotifications: (data: DeleteNotificationsData) => void
}

interface HeaderProps extends MapStateToProps, MapDispatchToProps {
  currentRoute: string;
}

interface HeaderState {
  dropdownFlag: boolean;
}

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      dropdownFlag: false,
    };
  }

  onClickSignOutBtn(): void {
    firebase.auth().signOut();
  }

  renderSign(): JSX.Element {
    return (
      <div className="sign-wrapper">
        {this.props.currentRoute === "/signin" ? (
          <Link to={"/signup"}>登録</Link>
        ) : (
          <Link to={"/signin"}>ログイン</Link>
        )}
      </div>
    );
  }

  className(): string {
    let baseClass: string = "notify-detail-wrapper bg-info";
    if (this.state.dropdownFlag) baseClass += " active";
    return baseClass;
  }

  onClickDropdown(): void {
    let dropdownFlag: boolean = !this.state.dropdownFlag;
    this.setState({ dropdownFlag });
    if (!dropdownFlag) {
      if (this.displayNotificationIds().length > 0) {
        this.props.deleteNotifications({
          userId: this.props.currentUserId,
          notificationIds: this.displayNotificationIds(),
        });
      }
    }
  }

  displayNotificationIds(): Array<string> {
    return Object.keys(this.props.notifications ?? {}).slice(0, 10);
  }

  displayCount(): string {
    let displayWord = "";
    let length = Object.keys(this.props.notifications || {}).length;
    displayWord = `${length}`;
    if (length > 10) {
      displayWord = "10+";
    }
    return displayWord;
  }

  getNoticeInfo(nid: string): NoticeProps | undefined {
    return (this.props.notifications ?? {})[nid];
  }

  renderHeaderNav(): JSX.Element {
    return (
      <React.StrictMode>
        {this.props.currentUser?.email ? (
          <div className="flex-display">
            <div
              className="notify-display-wrapper"
              onClick={this.onClickDropdown.bind(this)}
            >
              <i className="fas fa-bell custom-font"></i>
              <span className="notify-number">
                {this.displayCount()}
                <i className="fas fa-angle-down"></i>
              </span>
              <div className={this.className()}>
                <div>
                  {this.displayNotificationIds().map((nid) => (
                    <NotificationCard
                      key={nid}
                      notice={this.getNoticeInfo(nid)!}
                    />
                  ))}
                </div>
              </div>
            </div>
            <ul className="top-btn-wrapper navbar-nav">
              <li className="nav-item">
                <span className="nav-link" onClick={this.onClickSignOutBtn}>
                  ログアウト
                </span>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/update-profile">
                  プロフィール変更
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          this.renderSign()
        )}
      </React.StrictMode>
    );
  }

  renderNavBar(): JSX.Element {
    return (
      <Navbar className="custom-nav-bar" bg="info" expand="lg">
        <span className="title">My Chat</span>
        <div className="menu-container">
          <div className="select-locale-container"></div>
          {this.renderHeaderNav()}
        </div>
      </Navbar>
    );
  }

  render(): JSX.Element {
    return <div className="header bg-info">{this.renderNavBar()}</div>;
  }
}

const mapStateToProps = (state: BaseState): MapStateToProps => {
  let notifications: NotificationsState = null;
  let currentUserId: string = "";
  let currentUser: CurrentUserState = null
  if (state.currentUser) {
    currentUser = state.currentUser
  }
  if (state.notifications) {
    currentUserId = state.currentUser?.currentUserId!;
    notifications = state.notifications
  }
  return {
    notifications,
    currentUserId,
    currentUser,
  };
};

const mapDispatchToProps: MapDispatchToProps = { deleteNotifications };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
