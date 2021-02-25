import React, { Component } from "react"

class SetProfile extends Component {
  render() {
    return (
      <div className="container">
        <form
          className="wrapper sign-form-container form-container bg-skyblue"
          method="POST"
        >
          <span className="title profile-title">プロフィール設定</span>
          <div className="form-group form-wrapper">
            <label className="form-label" htmlFor="name">
              名前
            </label>
            <span className="text-danger font-weight-bold">
              入力してください
            </span>
            <input className="form-control" id="name" type="text" />
          </div>
          <div className="form-group form-wrapper">
            <div>
              <label
                htmlFor="photoURL"
                style={{ fontWeight: "bold" }}
                className="file-label"
              >
                <i
                  className="fas fa-portrait fa-2x"
                  style={{ padding: "10px" }}
                ></i>
                <span style={{ margin: "0 auto" }}>
                  サムネイル設定
                  <span>
                    （※設定しない場合は下のデフォルトのものになります。）
                  </span>
                </span>
              </label>
              <input
                type="file"
                accept="image/*"
                id="photoURL"
                style={{ display: "none" }}
              />
              <p className="img-wrapper">
                <span className="img-wrapper">
                  <img src="../../images/default.png" alt="サムネイル" />
                  {/* <img v-else-if="originPhotoURL" v-bind:src="originPhotoURL" > */}
                  <span className="reset-btn">取り消し</span>
                </span>
                {/* <img src="@/assets/images/default.png" width="100px" height="100px" /> */}
              </p>
            </div>
          </div>
          <div className="btn-wrapper">
            <button className="btn btn-light border-dark border profile-register-btn">プロフィール設定</button>
          </div>
        </form>
      </div>
    )
  }
}

export default SetProfile
