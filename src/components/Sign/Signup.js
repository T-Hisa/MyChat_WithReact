import React, { Component } from 'react'

class Signup extends Component {
  constructor (props) {
    super(props)
    console.log('props at signup',props)
  }

  componentDidMount () {
    console.log('signup component did mount')
    console.log('this', this)
  }

  onInputEmail (value) {
    console.log('value', value)
  }

  onInputPassword (e) {
    console.log('e', e)
  }

  onClickSignupBtn () {
    console.log('clicked!!')
  }

  render() {
    return (
      <React.StrictMode>
        <form className="form-container sign-form-container bg-skyblue" method="POST">
          <span className="title-sign">登録</span>
          <div className="form-group form-wrapper">
            <label className="form-label" htmlFor="email">Eメール</label>
            <input className="form-control" id="email" type="text" onInput={this.onInputEmail} />
          </div>
          <div className="form-group form-wrapper">
            <label className="form-label" htmlFor="password">パスワード</label>
            <input className="form-control" id="password" type="password" onInput={this.onInputPassword} />
          </div>
          <button className="btn btn-outline-dark register-btn" onClick={this.onClickSignupBtn}>登録</button>
        </form>
      </React.StrictMode>
    )
  }
}

// const mapStateToProps = state => ({})

export default Signup