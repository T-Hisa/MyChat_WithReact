import React, { Component } from "react"
import { connect } from "react-redux"

import ProfileCommon from "./ProfileCommon"

class UpdateProfile extends Component {
  componentDidMount() {
    console.log("upddateProfile component did MOunt!")
  }

  render () {
    return (
      <ProfileCommon
        username={this.props.currentUser.displayName}
        photoURL={this.props.currentUser.photoURL}
      />
    )
  }
}

const mapStateToProps = (state) => {
  console.log("state", state)
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps, null)(UpdateProfile)