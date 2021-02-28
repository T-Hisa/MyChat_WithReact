import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"

class User extends Component {
  sample() {
    console.log("props at UserComponent", this.props)
    const userId = this.props.userId
    this.props.history.push(`/direct/${userId}`)
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
      <li className="user-info-wrapper">
        <div onClick={this.sample.bind(this)}>
          <div className="user-wrapper">
            {
              this.userInfo().photoURL ?
                this.renderImage(this.userInfo().photoURL) :
                this.renderImage(this.props.defaultPhoto)
            }
            <div className="user-info">{this.userInfo().username}</div>
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

export default withRouter(connect(mapStateToProps, null)(User))
