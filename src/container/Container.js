import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import Sidebar from "../components/menu/Sidebar"
import SetProfile from "../components/Profile/SetProfile"
import UserSelect from "../components/chat/UserSelect"

class Container extends Component {

  // constructor(props) {
  //   super(props)
  //   console.log('container ')
  // }

  componentDidMount() {
    console.log('Container component did mount!')
  }

  isSetProfile() {
    console.log('isSetProfile', !!(this.props.currentUser && this.props.currentUser.displayName))
    return !!(this.props.currentUser && this.props.currentUser.displayName)
  }

  renderMain() {
    return (
      <React.StrictMode>
        <div className="flex-display">
          <Sidebar />
          <Route exact path="/direct"
            render={(routeProps) => {
              <UserSelect/>
            }}
          />
        </div>
      </React.StrictMode>
    )
  }

  renderProfile() {
    return (
      <React.StrictMode>
        <Route exact path="/set-profile" component={SetProfile} />
        <Route path="/">
          <Redirect to="/set-profile"/>
        </Route>
      </React.StrictMode>
    )
  }

  render() {
    return (
      <React.StrictMode>
        {this.isSetProfile() ? this.renderMain() : <SetProfile/> }
      </React.StrictMode>
    )
  }
}

export default Container
