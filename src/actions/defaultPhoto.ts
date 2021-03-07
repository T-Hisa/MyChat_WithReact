import { Action, Dispatch } from "redux";
import { storage } from "./index";

export const GET_DEFAULT_PHOTO = "GET_DEFAULT_PHOTO";

export interface GetDefaultPhotoAction extends Action {
  type: "GET_DEFAULT_PHOTO";
  url: string;
}

export const getDefaultPhoto = () => (dispatch: Dispatch<GetDefaultPhotoAction>) => {
  storage
    .ref("default.png")
    .getDownloadURL()
    .then((url: string) => {
      dispatch({ type: GET_DEFAULT_PHOTO, url });
    });
};
