import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals'
import App from './App'
import './scss/main.scss';
import firebase from './firebase-setup'

// React.prototype.$firebase = firebase
console.log('React', React)
console.log('ReactDOM', ReactDOM)
firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(
    <App
      currentUser={user}
    />,
    document.getElementById('root')
  );
})
reportWebVitals();
