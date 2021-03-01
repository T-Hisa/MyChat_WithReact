import React, { Component } from "react"
import { connect } from "react-redux"
import { Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import firebase from "../../firebase-setup"
import { deleteNotifications } from "../../actions/notifications"
import NotificationCard from "./NotificationCard"

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdownFlag: false,
    }
  }

  onClickSignOutBtn(e) {
    e.preventDefault()
    firebase.auth().signOut()
  }

  renderSign() {
    return (
      <div className="sign-wrapper">
        {this.props.currentRoute === "/signin" ? (
          <Link to={"/signup"}>登録</Link>
        ) : (
          <Link to={"/signin"}>ログイン</Link>
        )}
      </div>
    )
  }

  className() {
    let baseClass = "notify-detail-wrapper bg-info"
    if (this.state.dropdownFlag) baseClass += " active"
    return baseClass
  }

  onClickDropdown() {
    let dropdownFlag = !this.state.dropdownFlag
    this.setState({ dropdownFlag })
    if (!dropdownFlag) {
      if (this.displayNotificationIds().length > 0) {
        this.props.deleteNotifications({
          userId: this.props.currentUserId,
          notificationIds: this.displayNotificationIds(),
        })
      }
    }
    console.log("refs", this.refs.foo)
  }

  displayNotificationIds() {
    return Object.keys(this.props.notifications).slice(0, 10)
  }

  displayCount() {
    let displayWord = ""
    let length = Object.keys(this.props.notifications || {}).length
    displayWord = length
    if (length > 10) {
      displayWord = "10+"
    }
    return displayWord
  }

  getNoticeInfo(nid) {
    return this.props.notifications[nid]
  }

  renderHeaderNav() {
    return (
      <React.StrictMode>
        {this.props.currentUser ? (
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
                      notice={this.getNoticeInfo(nid)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <ul className="top-btn-wrapper navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={this.onClickSignOutBtn}
                  href="#"
                >
                  ログアウト
                </a>
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
    )
  }

  renderNavBar() {
    return (
      <Navbar className="custom-nav-bar" bg="info" expand="lg">
        <span className="title">My Chat</span>
        <div className="menu-container">
          <div className="select-locale-container"></div>
          {this.renderHeaderNav()}
        </div>
      </Navbar>
    )
  }

  render() {
    return <div className="header bg-info">{this.renderNavBar()}</div>
  }
}

const mapStateToProps = (state) => {
  const notifications =
    state.notifications[state.currentUser.currentUserId] || {}
  return {
    notifications,
    currentUserId: state.currentUser.currentUserId,
  }
}

const mapDispatchToProps = { deleteNotifications }

export default connect(mapStateToProps, mapDispatchToProps)(Header)
