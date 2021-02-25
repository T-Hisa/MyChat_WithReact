import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals'
import App from './App'
import './scss/main.scss';
// import firebase from './firebase-setup'

// React.prototype.$firebase = firebase
console.log('React', React)
console.log('ReactDOM', ReactDOM)

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
reportWebVitals();
