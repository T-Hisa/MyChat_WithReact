import React, { Component } from "react"
import { connect } from "react-redux"
import { updateUserProfile } from "../../actions/users"
import { getCurrentUser } from "../../actions/currentUser"
// import { getDefaultPhoto } from "../../actions/defaultPhoto"
// import {  } from "../../actions/currentUser"
import ProfileCommon from "./ProfileCommon"

// import firebase from "../../firebase-setup"
// const storage = firebase.storage()

class SetProfile extends Component {
  constructor(props) {
    super(props)
    console.log("props at setProfile", props)
    if (props["image"]) this.state["image"] = props["image"]
    this.props.getCurrentUser()
  }

  componentDidMount() {
    // this.props.getDefaultPhoto()
    console.log("set-profile component did mount!!", this.props)
  }
  // handleNameError(username) {
  //   let errorMessage = ""
  //   if (!username) errorMessage = "入力してください"
  //   else if (username.length > 8) errorMessage = "8文字以内で入力してください"
  //   this.setState({ errorMessage })
  // }

  render() {
    return (
      <ProfileCommon
        // imgURL={this.state.imgURL}
        // updateState={this.updateState.bind(this)}
        // defaultPhoto={this.props.defaultPhoto}
        // errorMessage={this.state.errorMessage}
        // errorFlag={this.state.errorFlag}
        // handleNameError={this.handleNameError.bind(this)}
        // handleSetProfile={this.onClickSetProfileBtn.bind(this)}
        // handlePhoto={this.onSelectThumbnail.bind(this)}
      />
    )
  }
}

// const mapStateToProps = (state) => ({ currentUserId: state.currentUserId })
const mapStateToProps = (state) => {
  console.log("state", state)
  return { currentUser: state.currentUser }
}

const mapDispatchToProps = {
  updateUserProfile,
  getCurrentUser,
  // getDefaultPhoto,
}

export default connect(mapStateToProps, mapDispatchToProps)(SetProfile)
