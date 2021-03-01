import React, { Component } from "react"
import { connect } from "react-redux"

import ProfileCommon from "../../components/profile/ProfileCommon"

class UpdateProfile extends Component {
  render() {
    return (
      <ProfileCommon
        username={this.props.currentUser.username}
        photoURL={this.props.currentUser.photoURL}
      />
    )
  }
}

const mapStateToProps = (state) => ({ currentUser: state.currentUser })

export default connect(mapStateToProps, null)(UpdateProfile)
