import React, { Component } from "react"
import { Route } from "react-router-dom"

import Header from "./components/menu/Header"

import Container from "./containers/Container"
import SignContainer from "./containers/SignContainer"
import RouteProps from "./types/RouteProps"
import firebase from "./firebase-setup"

interface BaseProps {
  currentUser: firebase.User | null
}

interface BaseState {
  currentRoute: string
}

class App extends Component<BaseProps, BaseState> {
  constructor(props: BaseProps) {
    super(props)
    this.state = {
      currentRoute: "",
    }
  }

  updateState(state: BaseState) {
    this.setState(state)
  }

  renderRegular() {
    return (
      <Route
        path="/"
        render={(routeProps: RouteProps) => (
          <Container
            currentUser={this.props.currentUser!}
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
          render={(routeProps: RouteProps) => (
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
          currentRoute={this.state.currentRoute}
        />
        <div style={{borderTop: "2px solid darkslateblue"}}>
          {this.props.currentUser ? this.renderRegular() : this.renderSign()}
        </div>
      </React.StrictMode>
    )
  }
}

export default App;
