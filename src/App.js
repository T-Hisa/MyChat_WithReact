import React, { Component } from "react"
import { Route } from "react-router-dom"

import Container from "./container/Container"

import Header from "./components/menu/Header"
import SignContainer from "./container/SignContainer"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentRoute: null,
    }
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
            currentUser={this.props.currentUser}
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
        <div style={{borderTop: "2px solid darkslateblue"}}>
          {this.props.currentUser ? this.renderRegular() : this.renderSign()}
        </div>
      </React.StrictMode>
    )
  }
}

export default App
