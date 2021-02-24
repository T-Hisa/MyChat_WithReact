import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class Header extends Component {
  constructor (props){
    super(props)
    console.log('props at header', props)
    // const {pathname} = props.location
    // this.state = {
    //   route: pathname
    // }
    // console.log(this.state)
  }

  componentDidMount () {
    console.log('this in header', this)
  }

  onClickSignoutBtn () {
    console.log('click!!')
  }

  renderNavBar() {
    return (
      <Navbar className="custom-nav-bar" bg="info" expand="lg">
        <span className="title">My Chat</span>
        <div className="menu-container">
          <div className="select-locale-container">
          </div>
          <React.StrictMode>
            <span className="signout-btn" href="#" onClick={this.onClickSignoutBtn}>ログアウト</span>
          </React.StrictMode>
          <div className="sign-wrapper">
            <Link to={'/signup'}>登録</Link>
            <Link to={'/signin'}>ログイン</Link>
          </div>
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