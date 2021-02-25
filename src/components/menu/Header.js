import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import firebase from '../../firebase-setup'

class Header extends Component {
  constructor (props){
    super(props)
    console.log('props at header', props)
    console.log('currentRoute at header', props.currentRoute)
  }

  componentDidMount () {
    console.log('this in header', this)
  }

  onClickSignOutBtn () {
    firebase.auth().signOut()
  }

  renderSign () {
    return (
      <div className="sign-wrapper">
        {
          this.props.currentRoute === '/signin' ?
            <Link to={'/signup'}>登録</Link> :
            <Link to={'/signin'}>ログイン</Link>
        }
      </div>
    )
  }

  renderSignOut () {
    return (
      <React.StrictMode>
        { this.props.currentUser ?
            <span className="signout-btn" href="#" onClick={this.onClickSignOutBtn}>ログアウト</span> :
            this.renderSign()
        }
      </React.StrictMode>
    )
  }

  renderNavBar() {
    return (
      <Navbar className="custom-nav-bar" bg="info" expand="lg">
        <span className="title">My Chat</span>
        <div className="menu-container">
          <div className="select-locale-container">
          </div>
          {this.renderSignOut()}
        </div>
      </Navbar>
    )
  }

  render() {
    return (
      <div className="header bg-info">
        {this.renderNavBar()}
      </div>
    )
  }
}

export default Header