import React, { Component } from "react"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { BrowserRouter, Route /*Redirect, */, Switch } from "react-router-dom"
import reducer from "./reducers"
import firebase from "./firebase-setup"

import Container from "./container/Container"

import Header from "./components/menu/Header"
import SignContainer from "./container/SignContainer"

const enhancer = applyMiddleware(thunk)
const store = createStore(reducer, enhancer)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentRoute: null,
      currentUser: null,
    }
  }

  componentDidUpdate() {
    console.log("will update at App")
    console.log("afterUpdate state is ", this.state)
  }

  updateState(state) {
    // console.log('updateState at App!', state)
    this.setState(state)
  }

  componentDidMount() {
    console.log("AppComponent did mount!")
    console.log("state at App", this.state)
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ currentUser: user })
    })
  }

  renderRegular() {
    return (
      <Route
        path="/"
        render={(routeProps) => (
          <Container
            currentUser={this.state.currentUser}
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
              currentUser={this.state.currentUser}
              {...routeProps}
            />
          )}
        />
        {/* <SignContainer></SignContainer>
        </Route> */}
        {/* <Route path="/" component={Signin} /> */}
      </div>
    )
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Header
            currentUser={this.state.currentUser}
            currentRoute={this.state.currentRoute}
          />
          <div>

            {/* <Switch> */}
            {this.state.currentUser ? this.renderRegular() : this.renderSign()}
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
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
