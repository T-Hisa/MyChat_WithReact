import { Component } from "react"
import { connect } from "react-redux"
import { renderImage } from "../../utils"

import UserDataProps from "../../types/models/User"
import BaseState, { UsersState } from "../../types/state"

interface MapStateToProps {
  defaultPhoto?: string
  users?: UsersState;
}

interface UserProps extends MapStateToProps {
  handleClickDelete?: ((data: string) => void)
  handleClickUser: (data: string) => void
  userId: string
}

class User extends Component<UserProps, {}> {
  onClickUser(): void {
    this.props.handleClickUser(this.props.userId)
  }

  onClickDeleteBtn(): void {
    if (this.props.handleClickDelete) this.props.handleClickDelete(this.props.userId)
  }

  userInfo(): UserDataProps {
    const userId: string = this.props.userId
    const user: UserDataProps = this.props.users![userId]
    return user
  }

  render(): JSX.Element {
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

const mapStateToProps = (state: BaseState): MapStateToProps => ({
  defaultPhoto: state.defaultPhoto,
  users: state.users,
})

export default connect(mapStateToProps)(User)
