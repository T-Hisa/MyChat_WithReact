import React, { Component } from "react"
import { connect } from "react-redux"
import User from "./User"

class UserSelect extends Component {
  componentDidMount() {
    console.log("UserSelect Component!")
    console.log("props", this.props)
  }

  renderUsers(uid) {
    return (
      <div>{uid}</div>
    )
  }

  verifiedOtherUserIds() {
    const otherUserIds = this.props.verifiedOtherUserIds.length > 0 ?
      this.props.verifiedOtherUserIds : []
    return otherUserIds
  }

  render() {
    return (
      <React.StrictMode>
        <div
          className="user-select-wrapper bg-lightskyblue"
        >
          <div className="user-select-title-wrapper">
            <span className="user-title">ダイレクトメッセージ</span>
            <span className="user-select-title">ユーザー選択</span>
            <span className="user-search-field-wrapper">
              <input
                className="user-search-field"
                type="text"
                placeholder={"ユーザー検索"}
              />
            </span>
          </div>
          <div className="no-user">ユーザーがいません</div>
          <div className="no-user">検索にヒットしたユーザーはいません。</div>
          <ul className="user-select-list">
              {
                this.verifiedOtherUserIds().map(uid => (
                  <User
                    userId={uid}
                    key={uid}
                  />
                ))
                /* <user
                v-bind:uid="uid"
              /> */
              }
          </ul>
        </div>
      </React.StrictMode>
      // <div>
      // </div>
    )
  }
}

const mapStateToProps = (state) => ({
  verifiedOtherUserIds: state.verifiedOtherUserIds,
  users: state.users
})

export default connect(mapStateToProps, null)(UserSelect)
