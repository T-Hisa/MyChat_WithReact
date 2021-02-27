import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { getCurrentUser } from "../../actions/currentUser"
import { getDefaultPhoto } from "../../actions/defaultPhoto"

class Profile extends Component {
  componentDidMount() {
    this.props.getDefaultPhoto()
  }

  getPhotoURL() {
    return this.props.currentUser.photoURL
  }

  render() {
    return (
      <React.StrictMode>
        <div className="nav-link profile-container">
          <Link className="none-style" to="/update-profile">
            {
              this.getPhotoURL() ?
                <img src={this.getPhotoURL()} alt="サムネイル" /> :
                <img src={this.props.defaultPhoto} alt="サムネイル" />
            }
            <p className="profile-name">{this.props.currentUser.displayName}</p>
          </Link>
        </div>
      </React.StrictMode>
    )
  }
}

const mapStateToProps = (state) => ({
  defaultPhoto: state.defaultPhoto,
  currentUser: state.currentUser,
})

const mapDispatchToProps = {
  getCurrentUser,
  getDefaultPhoto,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
