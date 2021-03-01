import React, { Component } from "react"
import firebase from "../../firebase-setup"
import SignCommon from "../../components/sign/SignCommon"

import { connect } from "react-redux"
import { setUserProfile } from "../../actions/users"



class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      emailFlag: false,
      passwordFlag: false,
    }
    const currentRoute = props.location.pathname
    props.updateState({ currentRoute })
  }

  updateSignState(state) {
    this.setState(state)
  }

  checkEmail() {
    const { email } = this.state
    const flag = !email.match(/^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i)
    return flag
  }

  checkPassword() {
    const { password } = this.state
    return !(password.length > 5)
  }

  onClickSignupBtn(e) {
    e.preventDefault()
    const { email, password } = this.state
    if (this.checkEmail() || password.length < 6) {
      this.setState({
        emailFlag: true,
        passwordFlag: true,
      })
      alert("入力に誤りがあります。もう一度確認してください。")
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password).then(data => {
          const {uid} = data.user
          this.props.setUserProfile({uid, email})
          this.props.history.push('set-profile')
        })
        .catch((e) => {
          alert("既に登録してあるメールアドレスです")
        })
    }
  }

  render() {
    return (
      <React.StrictMode>
        <SignCommon
          title="登録"
          checkEmail={this.checkEmail()}
          checkPassword={this.checkPassword()}
          updateSignState={this.updateSignState.bind(this)}
          emailFlag={this.state.emailFlag}
          passwordFlag={this.state.passwordFlag}
          handleClick={this.onClickSignupBtn.bind(this)}
        />
      </React.StrictMode>
    )
  }
}

const mapDispatchToProps = { setUserProfile }
export default connect(null, mapDispatchToProps)(Signup)
