import React, { Component, MouseEvent, KeyboardEvent } from "react"

interface SignCommonProps {
  title: string
  checkEmail: (data: string) => boolean
  checkPassword: (data: string) => boolean
  emailFlag: boolean
  passwordFlag: boolean
  handleClick: Function
}

export interface SignCommonState {
  email: string
  password: string
}

class SignCommon extends Component<SignCommonProps, SignCommonState> {
  constructor(props: SignCommonProps) {
    super(props)
    this.state = {
      email: "",
      password: "",
    }
  }

  static defaultProps = {
    emailFlag: false,
    passwordFlag: false,
    checkEmail: () => true,
    checkPassword: () => true,
  }

  onInputPassword(e: KeyboardEvent<HTMLInputElement>): void {
    const password = e.currentTarget.value
    this.setState({ password })
  }

  onInputEmail(e: KeyboardEvent<HTMLInputElement>): void {
    const email = e.currentTarget.value
    this.setState({ email })
  }

  onClickSignBtn(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault()
    this.props.handleClick(this.state)
  }

  render(): JSX.Element {
    return (
      <form
        className="form-container sign-form-container bg-skyblue"
        method="POST"
      >
        <span className="title-sign">{this.props.title}</span>
        <div className="form-group form-wrapper">
          <label className="form-label" htmlFor="email">
            Eメール
            {this.props.checkEmail(this.state.email) && this.props.emailFlag && (
              <span className="text-danger label-text">
                正しいEメールの形式で入力してください
              </span>
            )}
          </label>
          <input
            className="form-control"
            id="email"
            type="text"
            onInput={this.onInputEmail.bind(this)}
          />
        </div>
        <div className="form-group form-wrapper">
          <label className="form-label" htmlFor="password">
            パスワード
            {this.props.checkPassword(this.state.password) && this.props.passwordFlag && (
              <span className="text-danger label-text">
                パスワードは6文字以上で入力してください
              </span>
            )}
          </label>
          <input
            className="form-control"
            id="password"
            type="password"
            onInput={this.onInputPassword.bind(this)}
          />
        </div>
        <button
          className="btn btn-outline-dark register-btn"
          onClick={this.onClickSignBtn.bind(this)}
        >
          {this.props.title}
        </button>
      </form>
    )
  }
}

export default SignCommon
