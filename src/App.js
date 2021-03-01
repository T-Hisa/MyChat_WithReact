import React, { Component } from "react"
import { Route } from "react-router-dom"
import firebase from "./firebase-setup"

import Container from "./container/Container"

import Header from "./components/menu/Header"
import SignContainer from "./container/SignContainer"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentRoute: null,
      currentUser: null,
    }
    firebase.auth().onAuthStateChanged((currentUser) => {
      this.setState({currentUser})
    })
  }

  updateState(state) {
    this.setState(state)
  }

  renderRegular() {
    return (
      <Route
        path="/"
        render={(routeProps) => (
          <Container
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
          currentUser={this.state.currentUser}
          currentRoute={this.state.currentRoute}
        />
        <div style={{borderTop: "2px solid darkslateblue"}}>
          {this.state.currentUser ? this.renderRegular() : this.renderSign()}
        </div>
      </React.StrictMode>
    )
  }
}

export default App
