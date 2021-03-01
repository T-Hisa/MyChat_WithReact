import React, { Component } from "react"
import { connect } from "react-redux"

class User extends Component {
  onClickUser() {
    const userId = this.props.userId
    this.props.handleClickUser(userId)
  }

  onClickDeleteBtn() {
    const userId = this.props.userId
    this.props.handleClickDelete(userId)
  }

  userInfo() {
    const userId = this.props.userId
    const user = this.props.users[userId]
    return user
  }

  renderImage(url) {
    return <img src={url} alt="サムネイル"/>
  }

  render() {
    return (
      <li  onClick={this.onClickUser.bind(this)} className="user-info-wrapper">
        <div>
          <div className="user-wrapper">
            {
              this.userInfo().photoURL ?
                this.renderImage(this.userInfo().photoURL) :
                this.renderImage(this.props.defaultPhoto)
            }
            <div className="user-info">{this.userInfo().username}</div>
            {
              this.props.handleClickDelete &&
                <i onClick={this.onClickDeleteBtn.bind(this)} className="fas fa-2x fa-times cross-icon"></i>
            }
          </div>
        </div>
      </li>
    )
  }
}

const mapStateToProps = (state) => ({
  defaultPhoto: state.defaultPhoto,
  users: state.users,
})

export default connect(mapStateToProps, null)(User)
