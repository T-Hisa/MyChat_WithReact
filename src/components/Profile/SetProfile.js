import React, { Component } from "react"
import firebase from "../../firebase-setup"
const storage = firebase.storage()

class SetProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      image: "",
      imgURL: null,
      photoURL: null,
      defaultPhotoURL: "",
      errorMessage: "",
      errorFlag: false
    }
    if (props["image"]) this.state["image"] = props["image"]
  }

  componentDidMount () {
    console.log('set-profile component did mount!!', this.props)
    storage.ref('default.png').getDownloadURL().then(url => {
      const defaultPhotoURL = url
      this.setState({defaultPhotoURL})
    })
  }

  onInputUsername(e) {
    const username = e.target.value
    this.setState({ username })
    this.handleNameError(username)
  }

  onSelectThumbnail(e) {
    if (this.state.image) window.URL.revokeObjectURL(this.state.image)
    const image = e.target.files[0]
    if (image) {
      const imgURL = window.URL.createObjectURL(image)
      this.setState({ imgURL, image })
    }
  }

  nameValidation(username) {
    return !!username && username.length < 8
  }

  onClickSetProfileBtn(e) {
    e.preventDefault()
    if (!this.state.errorMessage) {
      if (this.state.imgURL) {
        this.setPhotoURL().then((url) => {
          this.state.photoURL = url
          this.updateProfileTask()
          window.URL.revokeObjectURL(this.state.imgURL)
        })
      } else {
        this.updateProfileTask()
      }
    } else {
      this.handleNameError(this.state.username)
      this.setState({ errorFlag: true })
    }
  }

  setPhotoURL () {
    const image = this.state.image
    const imageNameArray = image.name.split('.')
    const fileType = imageNameArray.pop()
    const saveImageName = `profilePhoto.${fileType}`
    const currentUserId = firebase.auth().currentUser.uid
    const metaData = {
      contentType: `image/${fileType}`
    }
    const photoRef = `images/${currentUserId}/${saveImageName}`
      const storageRef = storage.ref(photoRef)
      return storageRef.put(image, metaData).then(retVal => {
        return retVal.ref.getDownloadURL()
      })
  }

  updateProfileTask() {
    const currentUser = firebase.auth().currentUser
    // const updateValue = {
    //   uid: currentUserId,
    //   username: this.state.username,
    //   photoURL: this.state.photoURL
    // }
    const updateValue = {
      displayName: this.state.username,
      photoURL: this.state.photoURL
    }
    console.log('photoURL', updateValue.photoURL)
    console.log('currentUser', currentUser)
    currentUser.updateProfile(updateValue).then(()=> {
      this.props.history.push('/direct')
    }).catch((e) => {
      console.log(e)
      alert("予期せぬエラーが発生しました")
    })
  }

  handleNameError(username) {
    let errorMessage = ""
    if (!username) errorMessage = "入力してください"
    else if (username.length > 8)
      errorMessage = "8文字以内で入力してください"
    this.setState({ errorMessage })
  }

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
            {this.state.errorMessage && this.state.errorFlag && (
              <span className="text-danger font-weight-bold">
                {this.state.errorMessage}
              </span>
            )}
            <input
              className="form-control"
              id="name"
              type="text"
              onInput={this.onInputUsername.bind(this)}
            />
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
                onChange={this.onSelectThumbnail.bind(this)}
              />
              <p className="img-wrapper">
                <span className="img-wrapper">
                {
                  this.state.imgURL ?
                    <img src={this.state.imgURL} /> :
                    <img src={this.state.defaultPhotoURL} alt="サムネイル" />
                }
                  <span className="reset-btn">取り消し</span>
                </span>
                {/* <img src="@/assets/images/default.png" width="100px" height="100px" /> */}
              </p>
            </div>
          </div>
          <div className="btn-wrapper">
            <button
              onClick={this.onClickSetProfileBtn.bind(this)}
              className="btn btn-light border-dark border profile-register-btn"
            >
              プロフィール設定
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default SetProfile
