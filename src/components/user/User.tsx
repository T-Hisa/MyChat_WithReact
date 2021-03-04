import React, { Component } from "react"
import { connect } from "react-redux"
import { renderImage } from "../../utils"

import UserModelProps from "../../types/models/User"

interface UserProps {
  userId: string
  handleClickUser: Function
  handleClickDelete?: Function | undefined

  users?: any
  defaultPhoto?: string
}

class User extends Component<UserProps, {}> {
  onClickUser() {
    this.props.handleClickUser(this.props.userId)
  }

  onClickDeleteBtn() {
    if (this.props.handleClickDelete) this.props.handleClickDelete(this.props.userId)
  }

  userInfo() {
    const userId: string = this.props.userId
    const user: UserModelProps = this.props.users[userId]
    return user
  }

  render() {
    return (
      <li  onClick={this.onClickUser.bind(this)} className="user-info-wrapper">
        <div>
          <div className="user-wrapper">
            {
              this.userInfo().photoURL ?
                renderImage(this.userInfo().photoURL!) :
                renderImage(this.props.defaultPhoto!)
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
