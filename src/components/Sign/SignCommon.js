import React, { Component } from 'react'

class SignCommon extends Component {
  constructor (props) {
    super(props)
  }

  onInputPassword (e) {
    const password = e.target.value
    this.props.updateSignState({password})
    // this.setState({password})
  }

  onInputEmail (e) {
    const email = e.target.value
    this.props.updateSignState({email})
  }

  render () {
    return (
      <form className="form-container sign-form-container bg-skyblue" method="POST">
        <span className="title-sign">{this.props.title}</span>
        <div className="form-group form-wrapper">
          <label className="form-label" htmlFor="email">Eメール
            {
              (this.props.checkEmail && this.props.emailFlag) &&
              <span className="text-danger label-text">正しいEメールの形式で入力してください</span>
            }
          </label>
          <input className="form-control" id="email" type="text" onInput={this.onInputEmail.bind(this)} />
        </div>
        <div className="form-group form-wrapper">
          <label className="form-label" htmlFor="password">パスワード
            {
              (this.props.checkPassword && this.props.passwordFlag) &&
              <span className="text-danger label-text">パスワードは6文字以上で入力してください</span>
            }
          </label>
          <input className="form-control" id="password" type="password" onInput={this.onInputPassword.bind(this)} />
        </div>
        <button className="btn btn-outline-dark register-btn" onClick={this.props.handleClick}>{this.props.title}</button>
      </form>

    )
  }
}

SignCommon.defaultProps = {
  emailFlag: false,
  passwordFlag: false,
  checkEmail: true,
  checkPassword: true
}

export default SignCommon
