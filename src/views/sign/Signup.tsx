import React, { Component } from "react"
import firebase from "../../firebase-setup"
import SignCommon, { SignCommonState } from "../../components/sign/SignCommon"

// import { connect } from "react-redux"
// import { setUserProfile } from "../../actions/users"

import RouteProps from "../../types/RouteProps"

interface SignupProps extends RouteProps{
  updateState: Function
}

interface SignupState {
  emailFlag: boolean
  passwordFlag: boolean
}


class Signup extends Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props)
    this.state = {
      emailFlag: false,
      passwordFlag: false,
    }
    const currentRoute = props.location.pathname
    props.updateState({ currentRoute })
  }

  checkEmail(email: string) {
    const flag = !email.match(/^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i)
    return flag
  }

  checkPassword(password: string) {
    return !(password.length > 5)
  }

  onClickSignupBtn(state: SignCommonState) {
    const { email, password } = state
    if (this.checkEmail(email) || password.length < 6) {
      this.setState({
        emailFlag: true,
        passwordFlag: true,
      })
      alert("入力に誤りがあります。もう一度確認してください。")
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password).then(data => {
          // const uid: string = data?.user?.uid
          // this.props.setUserProfile({uid, email})
          this.props.history.push('set-profile')
        })
        .catch(() => {
          alert("既に登録してあるメールアドレスです")
        })
    }
  }

  render() {
    return (
      <React.StrictMode>
        <SignCommon
          title="登録"
          checkEmail={this.checkEmail}
          checkPassword={this.checkPassword}
          emailFlag={this.state.emailFlag}
          passwordFlag={this.state.passwordFlag}
          handleClick={this.onClickSignupBtn.bind(this)}
        />
      </React.StrictMode>
    )
  }
}

// const mapDispatchToProps = { setUserProfile }
// export default connect(null, mapDispatchToProps)(Signup)

export default Signup