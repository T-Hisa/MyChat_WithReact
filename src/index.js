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

const enhancer = applyMiddleware(thunk)
const store = createStore(reducer, enhancer)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App
      />
    </Router>
  </Provider>,
  document.getElementById("root")
)
reportWebVitals()
