import React, { Component } from "react"
import { connect } from "react-redux"
import { Route } from "react-router-dom"
import firebase from "./firebase-setup"

import Container from "./container/Container"

import Header from "./components/menu/Header"
import SignContainer from "./container/SignContainer"

import { getCurrentUser } from "./actions/currentUser"

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
    return !!(this.props.currentUser && this.props.currentUser.uid)
  }

  componentDidMount() {
    this.props.getCurrentUser()
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

  sample() {
    console.log("this.isSet", this.isSetCurrentUser())
    // console.log("firebase.auth().currentUser", firebase.auth().currentUser)
  }

  render() {
    return (
      <React.StrictMode>
        {/* <Provider store={store}>
          <BrowserRouter> */}
        <Header
          currentUser={this.props.currentUser}
          currentRoute={this.state.currentRoute}
        />
        <div onClick={this.sample.bind(this)}>
          {/* <Switch> */}
          {this.isSetCurrentUser() ? this.renderRegular() : this.renderSign()}
          {/* <Route exact path="/">
            {
              this.currentUser() ?
                <Container/> :
                this.renderSign()
            }
          </Route>
          <Route path="/">
            <Redirect to="/"></Redirect>
          </Route> */}
          {/* </Switch> */}
        </div>
        {/* </BrowserRouter>
        </Provider> */}
      </React.StrictMode>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("state at App1", state)
  return {
    currentUser: state.currentUser,
  }
}

const mapDispatchToProps = { getCurrentUser }

export default connect(mapStateToProps, mapDispatchToProps)(App)
