import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

class Profile extends Component {

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
            <p className="profile-name">{this.props.currentUser.username}</p>
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

export default connect(mapStateToProps, null)(Profile)
