import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { BaseState, storage } from "./index";

export const GET_DEFAULT_PHOTO = "GET_DEFAULT_PHOTO";

export interface GetDefaultPhotoAction extends Action {
  type: "GET_DEFAULT_PHOTO";
  url: string;
}

export const getDefaultPhoto = (): ThunkAction<
  void,
  BaseState,
  unknown,
  Action
> => (dispatch: Dispatch<GetDefaultPhotoAction>, getState: () => BaseState) => {
  const state: BaseState = getState()
  console.log("getStateResult!", state);
  storage
    .ref("default.png")
    .getDownloadURL()
    .then((url: string) => {
      dispatch({ type: GET_DEFAULT_PHOTO, url });
    });
};
