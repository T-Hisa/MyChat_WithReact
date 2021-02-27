import React, { Component } from "react"
import { connect } from "react-redux"
import { Route } from "react-router-dom"
import firebase from "./firebase-setup"

import Container from "./container/Container"

import Header from "./components/menu/Header"
import SignContainer from "./container/SignContainer"

// import { getCurrentUser } from "./actions/currentUser"

// firebase.auth().onAuthStateChanged(user => {

// })

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentRoute: null
    }
  }

  componentDidUpdate() {
    console.log("will update at App")
    console.log("afterUpdate state is ", this.state)
  }

  updateState(state) {
    this.setState(state)
  }

  isSetCurrentUser() {
    console.log("currentUser", firebase.auth().currentUser)
    return firebase.auth().currentUser
    // return !!(this.props.currentUser && this.props.currentUser.uid)
  }

  componentDidMount() {
    // this.props.getCurrentUser()
  }

  renderRegular() {
    return (
      <Route
        path="/"
        render={(routeProps) => (
          <Container
            // currentUser={this.state.currentUser}
            {...routeProps}
          />
        )}
      />
    )
  }

  renderSign() {
    return (
      <div className="container">
        <Route
          path="/"
          render={(routeProps) => (
            <SignContainer
              updateState={this.updateState.bind(this)}
              {...routeProps}
            />
          )}
        />
      </div>
    )
  }


  render() {
    return (
      <React.StrictMode>
        <Header
          currentUser={this.props.currentUser}
          currentRoute={this.state.currentRoute}
        />
        <div>
          {this.isSetCurrentUser() ? this.renderRegular() : this.renderSign()}
        </div>
      </React.StrictMode>
    )
  }
}

export default connect(null, null)(App)
