import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"

import BaseState, { CurrentUserState } from "../../types/state"

interface MapStateToProps {
  currentUser?: CurrentUserState
  defaultPhoto?: string
}

type ProfileProps = MapStateToProps

class Profile extends Component<ProfileProps, {}> {

  getPhotoURL(): string {
    return this.props.currentUser?.photoURL!
  }

  render(): JSX.Element {
    return (
      <React.StrictMode>
        <div className="nav-link profile-container">
          <Link className="none-style" to="/update-profile">
            {/* { this.getPhotoURL() && <img src={this.getPhotoURL()} alt="サムネイル" /> } */}
            {
              this.getPhotoURL() ?
                <img src={this.getPhotoURL()} alt="サムネイル" /> :
                <img src={this.props.defaultPhoto} alt="サムネイル" />
            }
            <p className="profile-name">{this.props.currentUser?.username}</p>
          </Link>
        </div>
      </React.StrictMode>
    )
  }
}

const mapStateToProps: (state: BaseState) => MapStateToProps = (state) => ({
  currentUser: state.currentUser,
  defaultPhoto: state.defaultPhoto,
})

export default connect(mapStateToProps, null)(Profile)

// export default Profile