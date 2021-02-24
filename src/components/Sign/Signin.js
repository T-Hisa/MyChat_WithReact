import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sampleAction } from '../../actions'

class Signin extends Component {
  constructor(props) {
    super(props)
    console.log('props at signin', props)
    this.onInputEmail = this.onInputEmail.bind(this)
  }

  componentDidMount () {
    console.log('signin component did mount!!')
    console.log('this', this)
  }

  onInputEmail (value) {
    console.log('value', value)
    this.props.sampleAction()
    console.log('this', this)
  }

  onInputPassword (e) {
    console.log('e', e)
  }

  onClickSigninBtn () {
    console.log('clicked!!')
  }

  render() {
    return (
      <React.StrictMode>
        <form className="form-container sign-form-container bg-skyblue" method="POST">
          <span className="title-sign">ログイン</span>
          <div className="form-group form-wrapper">
            <label className="form-label" htmlFor="email">Eメール</label>
            <input className="form-control" id="email" type="text" onInput={this.onInputEmail} />
          </div>
          <div className="form-group form-wrapper">
            <label className="form-label" htmlFor="password">パスワード</label>
            <input className="form-control" id="password" type="password" onInput={this.onInputPassword} />
          </div>
          <button className="btn btn-outline-dark register-btn" onClick={this.onClickSigninBtn}>ログイン</button>
        </form>
      </React.StrictMode>
    )
  }
}

// const mapStateToProps = state => ({ count: state.count })
const mapStateToProps = (state, props) => {
  console.log('state', state)
  console.log('props', props)
  return {
    count: state.sample.count
  }
}
const mapDispatchToProps = { sampleAction }

export default connect(mapStateToProps, mapDispatchToProps)(Signin)