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
import firebase from "./firebase-setup"

const enhancer = applyMiddleware(thunk)
const store = createStore(reducer, enhancer)

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App
          currentUser={user}
        />
      </Router>
    </Provider>,
    document.getElementById("root")
  )
})
reportWebVitals()
