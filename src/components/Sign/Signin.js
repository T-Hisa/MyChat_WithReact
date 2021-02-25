import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sampleAction } from '../../actions'
import firebase from '../../firebase-setup'

class Signin extends Component {
  constructor(props) {
    super(props)
    console.log('props at signin', props)
    console.log('firebase', firebase)
    this.state = {
      currentUser: null,
      email: '',
      password: ''
    }
    const currentRoute = props.location.pathname
    props.updateState({currentRoute})
  }

  componentDidMount () {
    console.log('signin component did mount!!')
    console.log('this', this)
  }

  onInputEmail (e) {
    const email = e.target.value
    this.setState({email})
  }

  onInputPassword (e) {
    e.preventDefault()
    const password = e.target.value
    this.setState({password})
  }

  onClickSigninBtn (e) {
    e.preventDefault()
    const {email, password} = this.state
    console.log('email', email)
    console.log('password', password)
    firebase.auth().signInWithEmailAndPassword(email, password)
  }

  render() {
    return (
      <React.StrictMode>
        <form className="form-container sign-form-container bg-skyblue" method="POST">
          <span className="title-sign">ログイン</span>
          <div className="form-group form-wrapper">
            <label className="form-label" htmlFor="email">Eメール</label>
            <input className="form-control" id="email" type="text" onInput={this.onInputEmail.bind(this)} />
          </div>
          <div className="form-group form-wrapper">
            <label className="form-label" htmlFor="password">パスワード</label>
            <input className="form-control" id="password" type="password" onInput={this.onInputPassword.bind(this)} />
          </div>
          <button className="btn btn-outline-dark register-btn" onClick={this.onClickSigninBtn.bind(this)}>ログイン</button>
        </form>
      </React.StrictMode>
    )
  }
}

// const mapStateToProps = state => ({ count: state.count })
const mapStateToProps = (state, props) => {
  return {
    count: state.sample.count
  }
}
const mapDispatchToProps = { sampleAction }

export default connect(mapStateToProps, mapDispatchToProps)(Signin)