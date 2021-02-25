import React, { Component } from "react"
import { connect } from "react-redux"
import { sampleAction } from "../../actions"
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

  componentDidMount() {
    console.log("signin component did mount!!")
    console.log("this", this)
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

// const mapStateToProps = state => ({ count: state.count })
const mapStateToProps = (state, props) => {
  return {
    count: state.sample.count,
  }
}
const mapDispatchToProps = { sampleAction }

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
