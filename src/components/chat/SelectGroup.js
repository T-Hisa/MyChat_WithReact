import React, { Component } from "react"
import { connect } from "react-redux"

class SelectGroup extends Component {
  render() {
    return (
      <div className="group-select-wrapper">
        <span className="group-title">グループ選択</span>
        <input
          type="text"
          className="group-search-field"
          placeholder="グループ検索"
        />
        <div className="no-group">所属しているグループはありません</div>
        <ul className="group-list-wrapper">
          <li clasNames="group-list">
            {/* <group
              v-bind:gid="gid"
            /> */}
          </li>
        </ul>
        <div className="no-group">検索にヒットしたグループはありません</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ groups: state.groups })

export default connect(mapStateToProps, null)(SelectGroup)
