import React, { Component, KeyboardEvent } from "react"
import { connect } from "react-redux"
// import User from "../../components/user/User"

import RouteProps from "../../types/RouteProps"

type SelectUserProps = RouteProps

interface SelectUserState {
  searchParams: string
}

class SelectUser extends Component<SelectUserProps, SelectUserState> {
  constructor(props: SelectUserProps) {
    super(props)
    this.state = {
      searchParams: "",
    }
  }

  onInputSearchField(e: KeyboardEvent<HTMLInputElement>) {
    const searchParams = e.currentTarget.value
    this.setState({ searchParams })
  }

  verifiedOtherUserIds() {
    // const otherUserIds =
    //   this.props.verifiedOtherUserIds.length > 0
    //     ? this.props.verifiedOtherUserIds
    //     : []
    return []
  }

  searchOtherUserIds() {
    // const otherUserIds = this.verifiedOtherUserIds()
    // return otherUserIds.filter(uid => {
    //   const {username} = this.props.users[uid]
    //   return username.indexOf(this.state.searchParams) > -1
    // })
    return []
  }

  getOtherUserFlexibly() {
    if (this.state.searchParams) return this.searchOtherUserIds()
    else return this.verifiedOtherUserIds()
  }

  handleClickUser(userId: string) {
    this.props.history.push(`/direct/${userId}`)
  }

  renderSearchResult() {
    return (
      <React.StrictMode>
      {
        this.getOtherUserFlexibly().length > 0 ?
          (<ul className="user-select-list">
            {/* {
              this.getOtherUserFlexibly().map((uid) => (
                <User
                  userId={uid}
                  key={uid}
                  handleClickUser={this.handleClickUser.bind(this)}
                />
              ))
            } */}
          </ul>) :
          <div className="no-user">検索にヒットしたユーザーはいません。</div>
      }
      </React.StrictMode>
    )
  }

  render() {
    return (
      <React.StrictMode>
        <div className="user-select-wrapper bg-lightskyblue">
          <div className="user-select-title-wrapper">
            <span className="user-title">ダイレクトメッセージ</span>
            <span className="user-select-title">ユーザー選択</span>
            <span className="user-search-field-wrapper">
              <input
                className="user-search-field"
                type="text"
                placeholder={"ユーザー検索"}
                onInput={this.onInputSearchField.bind(this)}
              />
            </span>
          </div>
          {
            this.verifiedOtherUserIds.length > 0 ? (
            <div className="no-user">ユーザーがいません</div>
          ) : (
            this.renderSearchResult()
          )}
        </div>
      </React.StrictMode>
    )
  }
}

// const mapStateToProps = (state) => ({
//   verifiedOtherUserIds: state.verifiedOtherUserIds,
//   users: state.users,
// })

// export default connect(mapStateToProps, null)(UserSelect)
export default SelectUser
