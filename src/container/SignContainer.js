import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import Signin from "../components/Sign/Signin"
import Signup from "../components/Sign/Signup"

class SignContainer extends Component {
  constructor(props) {
    super(props)
    console.log("props at SignContainer", props)
    console.log("this at SignContainer", this)
    // const currentRoute = props.location.pathname
    this.state = {
      currentRoute: null,
    }
    // props.updateState(this.¥)
  }

  updateState(state) {
    console.log("updateState at SignContainer!", state)
    this.setState(state)
    this.props.updateState(state)
  }

  render() {
    return (
      <div className="relative-container">
        <Route
          exact
          path="/signin"
          render={(routeProps) => (
            <Signin updateState={this.updateState.bind(this)} {...routeProps} />
          )}
        />
        <Route
          exact
          path="/signup"
          render={(routeProps) => (
            <Signup updateState={this.updateState.bind(this)} {...routeProps} />
          )}
        />
        <Route path="/">
          <Redirect to="/signin" />
        </Route>
      </div>
    )
  }
}

export default SignContainer
