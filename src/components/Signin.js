import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sampleAction } from '../actions'

class Signin extends Component {
  constructor(props) {
    super(props)
    console.log('props', props)
    this.func = this.func.bind(this)
  }

  componentDidMount () {
    console.log('signin component did mount!!')
    console.log('this', this)
  }

  func () {
    console.log('clicked!!')
    // console.log('this.props', this.props)
    this.props.sampleAction()
    console.log('this', this)
  }

  render() {
    return (
      <React.StrictMode>
        <div onClick={this.func}>Signin</div>
      </React.StrictMode>
    )
  }
}

const mapStateToProps = state => ({ count: state.count })
const mapDispatchToProps = { sampleAction }

export default connect(mapStateToProps, mapDispatchToProps)(Signin)