import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Sidebar from '../components/menu/Sidebar'

class Container extends Component {
  currentUser () {
    return false
  }

  render () {
    return (
      <React.StrictMode>
        <div className="flex-display">
          <Sidebar/>
        </div>
        { this.currentUser() ?
            (<Route exact path="/signin"/>) :
            (<Route exact path="/signin"/>)
        }
      </React.StrictMode>
    )
  }
}

export default Container