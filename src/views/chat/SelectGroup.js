import React, { Component } from "react"
import { connect } from "react-redux"
import Group from "../../components/group/Group"

class SelectGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchParams: "",
    }
  }

  onInputSearchField(e) {
    const searchParams = e.target.value
    this.setState({ searchParams })
  }

  searchGroupIds() {
    const belongingGroupIds = this.getBelongingGroupIds()
    return belongingGroupIds.filter(gid => {
      const groupName = this.props.groups[gid].groupName
      return groupName.indexOf(this.state.searchParams) > -1
    })
  }

  getGroupIdsFlexibly() {
    if (this.state.searchParams) return this.searchGroupIds()
    else return this.getBelongingGroupIds()
  }

  getBelongingGroupIds() {
    const { groups } = this.props
    const wholeGroupIds = Object.keys(this.props.groups ?? {})
    const belongingGroupIds = wholeGroupIds.filter((gid) => {
      const { currentUserId } = this.props.currentUser
      return Object.keys(groups[gid].memberIds).includes(currentUserId)
    })
    return belongingGroupIds
  }

  renderGroups() {
    return (
      <ul className="group-list-wrapper">
          {
            this.getGroupIdsFlexibly().length > 0 ?
              this.getGroupIdsFlexibly().map((gid) => (
                <li key={gid} className="group-list">
                  <Group
                    group={this.props.groups[gid]}
                    gid={gid}
                    users={this.props.users}
                  />
                </li>)) :
              <div className="no-group">検索にヒットしたグループはありません</div>
          }
      </ul>
    )
  }

  render() {
    return (
      <div className="group-select-wrapper">
        <span className="group-title">グループ選択</span>
        <input
          type="text"
          className="group-search-field"
          placeholder="グループ検索"
          onInput={this.onInputSearchField.bind(this)}
        />
        {this.getBelongingGroupIds().length === 0 ? (
          <div className="no-group">所属しているグループはありません</div>
        ) : (
          this.renderGroups()
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  groups: state.groups,
  currentUser: state.currentUser,
  users: state.users,
})
export default connect(mapStateToProps, null)(SelectGroup)
