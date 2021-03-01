import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { devideByNoticeType } from "../../utils"

class NotificationCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayWord: "",
      handleClickEvent: () => {},
    }
  }

  componentDidMount() {
    const { notice, users, groups, history } = this.props
    const { displayWord, handleClickEvent } = devideByNoticeType(
      notice,
      users,
      groups,
      history
    )
    this.setState({ displayWord, handleClickEvent })
  }

  render() {
    return (
      <div className="notify-dropdown">
        <div
          className="type-wrapper"
          onClick={this.state.handleClickEvent.bind(this)}
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
