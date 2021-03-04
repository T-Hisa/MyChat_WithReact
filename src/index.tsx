import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Ruoter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reportWebVitals from "./reportWebVitals";
import reducer from "./reducers"
import App from "./App";
import "./scss/main.scss";
import firebase from "./firebase-setup";

const enhancer = applyMiddleware(thunk)
const store = createStore(reducer, enhancer)
firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(
    <Provider store={store}>
      <Ruoter>
        <App
          currentUser={user}
        />
      </Ruoter>
    </Provider>,
    document.getElementById("root")
  );
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
