import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter as Router} from "react-router-dom"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import reportWebVitals from "./reportWebVitals"
import reducer from "./reducers"
import App from "./App"
import "./scss/main.scss"
import firebase from './firebase-setup'

const enhancer = applyMiddleware(thunk)
const store = createStore(reducer, enhancer)

// React.prototype.$firebase = firebase
console.log("React", React)
console.log("ReactDOM", ReactDOM)
firebase.auth().onAuthStateChanged((user) => {
  // this.setState({ currentUser: user })
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>,
    // {/* <App
    // // currentUser={user}
    // />, */}
    document.getElementById("root")
  )
})
reportWebVitals()
