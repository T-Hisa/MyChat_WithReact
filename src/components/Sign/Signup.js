import React, { Component } from 'react'
import firebase from '../../firebase-setup'

class Signup extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    const currentRoute = props.location.pathname
    props.updateState({currentRoute})
  }

  componentDidMount () {
    console.log('signup component did mount')
    console.log('this', this)
  }

  onInputEmail (e) {
    const email = e.target.value
    this.setState({email})
  }

  onInputPassword (e) {
    const password = e.target.value
    this.setState({password})
  }

  onClickSignupBtn (e) {
    e.preventDefault()
    console.log('clicked!!')
    const {email, password} = this.state
    console.log('email', email)
    console.log('password', password)
    if (email && password.length > 6) {
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(e => {
        alert('既に登録してあるメールアドレスです')
      })
    }
  }

  render() {
    return (
      <React.StrictMode>
        <form className="form-container sign-form-container bg-skyblue" method="POST">
          <span className="title-sign">登録</span>
          <div className="form-group form-wrapper">
            <label className="form-label" htmlFor="email">Eメール</label>
            <input className="form-control" id="email" type="text" onInput={this.onInputEmail.bind(this)} />
          </div>
          <div className="form-group form-wrapper">
            <label className="form-label" htmlFor="password">パスワード</label>
            <input className="form-control" id="password" type="password" onInput={this.onInputPassword.bind(this)} />
          </div>
          <button className="btn btn-outline-dark register-btn" onClick={this.onClickSignupBtn.bind(this)}>登録</button>
        </form>
      </React.StrictMode>
    )
  }
}

// const mapStateToProps = state => ({})

export default Signup