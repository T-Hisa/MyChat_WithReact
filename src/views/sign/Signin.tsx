import React, { Component } from "react"
import RouteProps from "../../types/RouteProps"

import firebase from "../../firebase-setup"
import SignCommon, { SignCommonState } from "../../components/sign/SignCommon"

interface SigninProps extends RouteProps {
  updateState: Function
}

class Signin extends Component<SigninProps, {}> {
  constructor(props: SigninProps) {
    super(props)
    const currentRoute: string = props.location.pathname
    props.updateState({ currentRoute })
  }

  onClickSigninBtn(state: SignCommonState) {
    const { email, password } = state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        const {user} = data
        if (user?.displayName) this.props.history.push('/direct')
        else this.props.history.push('/set-profile')
      })
      .catch(() => {
        alert("ユーザーが見当たりません")
      })
  }

  render() {
    return (
      <React.StrictMode>
        <SignCommon
          title="ログイン"
          handleClick={this.onClickSigninBtn.bind(this)}
        />
      </React.StrictMode>
    )
  }
}

export default Signin
