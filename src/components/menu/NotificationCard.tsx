import { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { devideByNoticeType } from "../../utils"

import RouteProps from "../../types/RouteProps"
import NoticeProps from "../../types/models/Notification"
import BaseState, { UsersState, GroupsState} from "../../types/state"

interface MapStateToProps {
  groups?: GroupsState
  users?: UsersState
}

interface NotificationCardProps extends RouteProps, MapStateToProps {
  notice: NoticeProps
}

interface NotificationCardState {
  displayWord: string
  handleClickEvent: () => void
}

class NotificationCard extends Component<NotificationCardProps, NotificationCardState> {
  constructor(props: NotificationCardProps) {
    super(props)
    this.state = {
      displayWord: "",
      handleClickEvent: () => {},
    }
  }

  componentDidMount(): void {
    const { notice, history } = this.props
    const users: UsersState = this.props.users!
    const groups: GroupsState = this.props.groups!
    const { displayWord, handleClickEvent } = devideByNoticeType(
      notice,
      users,
      groups,
      history
    )
    this.setState({ displayWord, handleClickEvent })
  }

  render(): JSX.Element {
    return (
      <div className="notify-dropdown">
        <div
          className="type-wrapper"
          onClick={() => {
            this.state.handleClickEvent()
          }}
        >
          {this.state.displayWord}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: BaseState): MapStateToProps => ({
  users: state.users,
  groups: state.groups,
})
export default withRouter(connect(mapStateToProps)(NotificationCard))
