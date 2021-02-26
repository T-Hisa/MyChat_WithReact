import React, { Component } from "react"

class UserSelect extends Component {
  componentDidMount() {
    console.log("UserSelect Component!")
  }
  render() {
    return (
      <React.StrictMode>

      </React.StrictMode>
      // <div>
      //   <div className="user-select-wrapper bg-lightskyblue">
      //     <div className="user-select-title-wrapper">
      //       <span className="user-title">ダイレクトメッセージ</span>
      //       <span className="user-select-title">ユーザー選択</span>
      //       <span class="user-search-field-wrapper">
      //         <input class="user-search-field" type="text" v-bind:placeholder="$t('select_user.search_user')" v-model="searchParams">
      //       </span>
      //     </div>
      //     <div class="no-user" v-if="!getOtherUserIds">{{$t('select_user.no_user')}}</div>
      //     <div class="no-user" v-else-if="getOtherUserIdsFlexiblly(searchParams).length === 0">{{$t('select_user.no_search_hit_user')}}</div>
      //     <ul v-else class="user-select-list">
      //       <li v-for="uid of getOtherUserIdsFlexiblly(searchParams)" :key="uid.id" class="user-info-wrapper">
      //         <user
      //           v-bind:uid="uid"
      //         />
      //       </li>
      //     </ul>
      //   </div>
      // </div>
    )
  }
}

export default UserSelect