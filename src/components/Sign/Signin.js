import React, { Component } from "react"

import firebase from "../../firebase-setup"
import SignCommon from "./SignCommon"

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }
    const currentRoute = props.location.pathname
    props.updateState({ currentRoute })
  }

  updateSignState(state) {
    this.setState(state)
  }

  onClickSigninBtn(e) {
    e.preventDefault()
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        const {user} = data
        if (user.displayName) this.props.history.push('/direct')
        else this.props.history.push('/set-profile')
      })
      .catch((e) => {
        alert("ユーザーが見当たりません")
      })
  }

  render() {
    return (
      <React.StrictMode>
        <SignCommon
          title="ログイン"
          updateSignState={this.updateSignState.bind(this)}
          handleClick={this.onClickSigninBtn.bind(this)}
        />
      </React.StrictMode>
    )
  }
}

export default Signin
