import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Signin from '../components/Sign/Signin'
import Signup from '../components/Sign/Signup'

class SignContainer extends Component {
  render () {
    return (
      <div className="relative-container" >
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/">
          <Redirect to="/signin"></Redirect>
        </Route>
      </div>
    )
  }
}

export default SignContainer