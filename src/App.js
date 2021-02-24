import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, /*Redirect, Switch */ } from 'react-router-dom'
import reducer from './reducers'

import Container from './container/Container'

import Header from './components/menu/Header'
import SignContainer from './container/SignContainer'

const enhancer = applyMiddleware(thunk)
const store = createStore(reducer, enhancer)

class App extends Component {
  constructor (props) {
    super(props)
    console.log('App component constructor!!')
    console.log('props at App', props)
    this.state = {
      currentRoute: null
    }
  }

  updateState (state) {
    this.setState(state)
    this.props.updateState(state)
  }

  componentDidMount () {
    console.log('AppComponent did mount!')
    console.log('currentUser', this.currentUser())
  }

  currentUser () {
    return false
  }

  renderRegular () {
    return (
      <Route path ="/"
        component={Container}
        updateState={this.updateState.bind(this)}
      />
    )
  }

  renderSign () {
    return (
      <div className="container">
        <Route path="/"
          component={SignContainer}
        />
        {/* <Route path="/" component={Signin} /> */}
      </div>
    )
  }

 render() {
   return (
    <Provider store={store}>
    <BrowserRouter>
      <Header />
      <div>
        {/* <Switch> */}
          {
            this.currentUser() ?
            this.renderRegular() :
            this.renderSign()
          }
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

export default App;
