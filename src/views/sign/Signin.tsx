import React, { Component } from "react"
import RouteProps from "../../types/RouteProps"

import firebase from "../../firebase-setup"
import SignCommon, { SignCommonState } from "../../components/sign/SignCommon"
import { UpdateSignStateFunction } from "../../containers/SignContainer"

interface SigninProps extends RouteProps {
  updateState: UpdateSignStateFunction
}

class Signin extends Component<SigninProps, {}> {
  constructor(props: SigninProps) {
    super(props)
    const currentRoute: string = props.location.pathname
    props.updateState({ currentRoute })
  }

  onClickSigninBtn(state: SignCommonState): void {
    const { email, password } = state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data: firebase.auth.UserCredential) => {
        const {user} = data
        if (user?.displayName) this.props.history.push('/direct')
        else this.props.history.push('/set-profile')
      })
      .catch(() => {
        alert("ユーザーが見当たりません")
      })
  }

  render(): JSX.Element {
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
