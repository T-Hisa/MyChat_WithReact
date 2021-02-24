import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import reducer from './reducers'
import reportWebVitals from './reportWebVitals';
import App from './components/App';
import Signin from './components/Signin'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';

const enhancer = applyMiddleware(thunk)
const store = createStore(reducer, enhancer)

ReactDOM.render(
  // <React.StrictMode>
  //   <App/>
  // </React.StrictMode>,
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/signin" component={Signin} />
      </Switch>
    </BrowserRouter>
  </Provider>,

  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
