import { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { devideByNoticeType } from "../../utils"

import RouteProps from "../../types/RouteProps"
import NoticeProps from "../../types/models/Notification"
// import UserProps from "../../types/models/User"
// import GroupProps from "../../types/models/Group"

interface NotificationCardProps extends RouteProps {
  notice: NoticeProps

  groups?: any
  users?: any
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
    const { notice, users, groups, history } = this.props
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

const mapStateToProps = (state) => ({
  users: state.users,
  groups: state.groups,
})
export default withRouter(connect(mapStateToProps, null)(NotificationCard))
