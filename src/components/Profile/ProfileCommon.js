import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { updateUserProfile } from "../../actions/users"
import firebase from "../../firebase-setup"
const storage = firebase.storage()

class ProfileCommon extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: File,
      imgURL: "",
      errorMessage: "入力してください",
      errorFlag: false,
      username: "",
      photoURL: "",
    }
  }

  componentDidMount() {
    if (this.props.username) {
      this.setState({
        username: this.props.username,
        photoURL: this.props.photoURL,
      })
    }
  }

  componentWillUnmount() {
    if (this.state.image) window.URL.revokeObjectURL(this.state.image)
  }

  onSelectThumbnail(e) {
    if (this.state.image) window.URL.revokeObjectURL(this.state.image)
    const image = e.target.files[0]
    if (image) {
      const imgURL = window.URL.createObjectURL(image)
      this.setState({ imgURL, image, photoURL: null })
    }
  }

  onInputUsername(e) {
    const username = e.target.value
    const errorMessage = this.handleNameError(this.state.username)
    this.setState({ username, errorMessage })
  }

  handleNameError(username) {
    let errorMessage = ""
    if (!username) errorMessage = "入力してください"
    else if (username.length > 8) errorMessage = "8文字以内で入力してください"
    return errorMessage
  }

  nameValidation() {
    return this.state.username && this.state.username.length < 8
  }

  onClickSetProfileBtn(e) {
    e.preventDefault()
    if (this.nameValidation()) {
      if (this.state.imgURL) {
        this.setPhotoURL().then((url) => {
          this.setState({
            photoURL: url,
          })
          this.updateProfileTask()
          window.URL.revokeObjectURL(this.state.imgURL)
        })
      } else {
        this.updateProfileTask()
      }
    } else {
      const errorMessage = this.handleNameError(this.state.username)
      alert(`名前を${errorMessage}`)
      this.setState({ errorFlag: true, errorMessage })
    }
  }

  setPhotoURL() {
    const image = this.state.image
    const imageNameArray = image.name.split(".")
    const fileType = imageNameArray.pop()
    const saveImageName = `profilePhoto.${fileType}`
    const currentUserId = this.props.currentUser.currentUserId
    const metaData = {
      contentType: `image/${fileType}`,
    }
    const photoRef = `images/${currentUserId}/${saveImageName}`
    const storageRef = storage.ref(photoRef)
    return storageRef.put(image, metaData).then((retVal) => {
      return retVal.ref.getDownloadURL()
    })
  }

  onClickResetBtn() {
    window.URL.revokeObjectURL(this.state.image)
    // this.props.photoURL = null
    // this.originPhotoURL = null
    this.setState({
      imgURL: null,
      image: null,
      photoURL: null,
    })
  }

  updateProfileTask() {
    this.updateUserData()
    const updateValue = {
      displayName: this.state.username,
      photoURL: this.state.photoURL,
    }
    console.log("photoURL", updateValue.photoURL)
    const currentUser = firebase.auth().currentUser
    currentUser
      .updateProfile(updateValue)
      .then(() => {
        this.props.history.push("/direct")
      })
      .catch((e) => {
        console.log(e)
        alert("予期せぬエラーが発生しました")
      })
  }

  updateUserData() {
    const saveData = {
      userId: this.props.currentUser.currentUserId,
      username: this.state.username,
      photoURL: this.state.photoURL,
    }
    console.log("sendData", saveData)
    this.props.updateUserProfile(saveData)
  }

  renderImage(image) {
    return (
      <React.StrictMode>
        <img src={image} />
        <span onClick={this.onClickResetBtn.bind(this)} className="reset-btn">
          取り消し
        </span>
      </React.StrictMode>
    )
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
              value={this.state.username}
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
                <span style={{ margin: "auto 0" }}>
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
                // onChange={this.props.handlePhoto}
                onChange={this.onSelectThumbnail.bind(this)}
              />
              <p className="img-wrapper">
                <span className="img-wrapper">
                  {this.state.photoURL ? (
                    this.renderImage(this.state.photoURL)
                  ) : this.state.imgURL ? (
                    this.renderImage(this.state.imgURL)
                  ) : (
                    <img src={this.props.defaultPhoto} alt="サムネイル" />
                  )}
                </span>
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    defaultPhoto: state.defaultPhoto,
  }
}

const mapDispatchToProps = { updateUserProfile }

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileCommon)
)
