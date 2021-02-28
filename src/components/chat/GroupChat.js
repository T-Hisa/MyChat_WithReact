import React, { Component } from "react"
import { connect} from "react-redux"
import ChatForm from "./ChatForm"
import ChatSelf from "./ChatSelf"
import ChatOther from "./ChatOther"

class GroupChat extends Component {
  render() {
    return (
      <div className="chat-whole-container">
        <div className="title-wrapper title-group">
          グループ<span className="name group-name">グループ名がここに入ります</span>
        </div>
        <div className="member-whole-wrapper">
          メンバー
          <ul className="member-wrapper">
          {/* {
            this.props.group.memberIds.map(memberId => (
              <li v-for="memberId in memberIds" :key="memberId.id" className="user-detail">
                <img v-if="getPhotoURL(memberId)" v-bind:src="getPhotoURL(memberId)" v-bind:alt="$t('utils.thumbnail')">
                <img v-else src="@/assets/images/default.png" v-bind:alt="$t('utils.thumbnail')">
                <div>{{ getUserName(memberId) }}</div>
              </li>
              
            ))
          } */}
          </ul>
        </div>
      </div>
    )
  }
}

export default GroupChat
