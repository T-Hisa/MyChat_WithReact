import React, {
  Component,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateUserProfile } from "../../actions/users";
import firebase from "../../firebase-setup";
import { handleNameError } from "../../utils";

import {
  UpdateProfilePropsForData,
  UpdateProfilePropsForAuth,
} from "../../types/Profile";
import RouteProps from "../../types/RouteProps";

const storage: firebase.storage.Storage = firebase.storage();

interface SetMetaData {
  contentType: string;
}

interface ProfileCommonProps extends RouteProps {
  currentUser?: any;
  username?: string;
  photoURL?: string | null;

  updateUserProfile?: any;
  defaultPhoto?: any;
}

interface ProfileCommonState {
  image: File | null; // File タイプではあるが、ここで File と宣言してしまうと、下の初期化時に caution が表示されるので any
  imgURL: string | null;
  errorMessage: string;
  errorFlag: boolean;
  username: string;
  photoURL: string | null;
}

class ProfileCommon extends Component<ProfileCommonProps, ProfileCommonState> {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imgURL: "",
      errorMessage: "入力してください",
      errorFlag: false,
      username: "",
      photoURL: "",
    };
  }

  componentDidMount(): void {
    if (this.props.username) {
      this.setState({
        username: this.props.username,
        photoURL: this.props.photoURL || null,
      });
    }
  }

  componentWillUnmount(): void {
    if (this.state.imgURL) window.URL.revokeObjectURL(this.state.imgURL);
  }

  onSelectThumbnail(e: ChangeEvent<HTMLInputElement>): void {
    if (this.state.imgURL) window.URL.revokeObjectURL(this.state.imgURL);
    const imageArray: FileList = e.target.files!;
    if (imageArray[0]) {
      const image: File = imageArray[0];
      const imgURL = window.URL.createObjectURL(image);
      this.setState({ imgURL, image, photoURL: null });
    }
  }

  onInputUsername(e: KeyboardEvent<HTMLInputElement>): void {
    const username: string = e.currentTarget.value;
    const errorMessage: string = handleNameError(username, 8);
    this.setState({ username, errorMessage });
  }

  nameValidation(): boolean {
    return !!(this.state.username && this.state.username.length < 9);
  }

  onClickSetProfileBtn(e: MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    if (this.nameValidation()) {
      if (this.state.imgURL) {
        this.setPhotoURL().then((url) => {
          this.setState({
            photoURL: url,
          });
          this.updateProfileTask();
          if (this.state.imgURL) window.URL.revokeObjectURL(this.state.imgURL);
        });
      } else {
        this.updateProfileTask();
      }
    } else {
      const errorMessage = handleNameError(this.state.username, 8);
      alert(`名前を${errorMessage}`);
      this.setState({ errorFlag: true, errorMessage });
    }
  }

  setPhotoURL(): Promise<string> {
    const image: File = this.state.image as File;
    const imageNameArray: Array<string> = image.name.split(".");
    const fileType: string = imageNameArray.pop()!;
    const saveImageName: string = `profilePhoto.${fileType}`;
    const currentUserId: string = this.props.currentUser.currentUserId;
    const metaData: SetMetaData = {
      contentType: `image/${fileType}`,
    };
    const photoRef: string = `images/${currentUserId}/${saveImageName}`;
    const storageRef: firebase.storage.Reference = storage.ref(photoRef);
    return storageRef
      .put(image, metaData)
      .then((retVal: firebase.storage.UploadTaskSnapshot) => {
        return retVal.ref.getDownloadURL();
      });
  }

  onClickResetBtn(): void {
    if (this.state.imgURL) window.URL.revokeObjectURL(this.state.imgURL);
    this.setState({
      imgURL: null,
      image: null,
      photoURL: null,
    });
  }

  updateProfileTask(): void {
    this.updateUserData();
    let updateValue: UpdateProfilePropsForAuth = {
      displayName: this.state.username,
      photoURL: this.state.photoURL,
    };
    const currentUser: firebase.User = firebase.auth().currentUser!;
    currentUser
      .updateProfile(updateValue)
      .then(() => {
        this.props.history.push("/direct");
      })
      .catch(() => {
        alert("予期せぬエラーが発生しました");
      });
  }

  updateUserData(): void {
    const saveData: UpdateProfilePropsForData = {
      userId: this.props.currentUser.currentUserId,
      username: this.state.username,
      photoURL: this.state.photoURL,
    };
    this.props.updateUserProfile(saveData);
  }

  renderImageWithCancel(image: string): JSX.Element {
    return (
      <React.StrictMode>
        <img src={image} alt="サムネイル" />
        <span onClick={this.onClickResetBtn.bind(this)} className="reset-btn">
          取り消し
        </span>
      </React.StrictMode>
    );
  }

  render(): JSX.Element {
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
                    this.renderImageWithCancel(this.state.photoURL)
                  ) : this.state.imgURL ? (
                    this.renderImageWithCancel(this.state.imgURL)
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    defaultPhoto: state.defaultPhoto,
  };
};

const mapDispatchToProps = { updateUserProfile };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileCommon)
);

// export default withRouter(ProfileCommon)
