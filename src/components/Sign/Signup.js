import React, { Component } from 'react'
import firebase from '../../firebase-setup'
import SignCommon from './SignCommon'

class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      emailFlag: false,
      passwordFlag: false
    }
    const currentRoute = props.location.pathname
    props.updateState({currentRoute})
  }

  componentDidMount () {
    console.log('signup component did mount')
    console.log('this', this)
  }

  updateSignState (state) {
    this.setState(state)
  }

  checkEmail () {
    const {email} = this.state
    const flag = !email.match(/^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i)
    return flag
  }

  checkPassword () {
    const {password} = this.state
    return !(password.length > 5)
  }

  onClickSignupBtn (e) {
    e.preventDefault()
    const {email, password} = this.state
    if (this.checkEmail() || password.length < 6) {
      this.setState({
        emailFlag: true,
        passwordFlag: true
      })
      alert('入力に誤りがあります。もう一度確認してください。')
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(e => {
        alert('既に登録してあるメールアドレスです')
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

export default Signup