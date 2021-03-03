import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { BaseState, storage } from "./index";
export const GET_DEFAULT_PHOTO = "GET_DEFAULT_PHOTO";

// let url
// const storage = firebase.storage()
// storage
//   .ref("default.png")
//   .getDownloadURL()
//   .then((defaultPhotoURL) => {
//     url = defaultPhotoURL
//   })

export interface GetDefaultPhotoAction extends Action {
  type: "GET_DEFAULT_PHOTO";
  url: string;
}

// export interface DefaultPhotoState {
//   defaultPhoto: string;
// }

export const getDefaultPhoto = (): ThunkAction<
  void,
  BaseState,
  unknown,
  GetDefaultPhotoAction
> => (dispatch: Dispatch, getState) => {
  const state = getState()
  console.log("getStateResult!", state);
  storage
    .ref("default.png")
    .getDownloadURL()
    .then((url: any) => {
      console.log("url", url);
      dispatch({ type: GET_DEFAULT_PHOTO, url });
    });
};
