import { ActionTypes } from "../constants/action-types";

export const setFiles = (files) => {
  return {
    type: ActionTypes.SET_FILES,
    payload: files,
  };
};

export const userSetFiles = (files) => {
  return {
    type: ActionTypes.USER_SET_FILES,
    payload: files,
  };
};
export const userDeleteFile = (file) => {
  return {
    type: ActionTypes.USER_DELETE_FILE,
    payload: file,
  };
};
export const userEditFile = (file) => {
  return {
    type: ActionTypes.USER_EDIT_FILE,
    payload: file,
  };
};
export const userSetRawData = (files) => {
  return {
    type: ActionTypes.USER_SET_RAW_DATA,
    payload: files,
  };
};

export const userDeleteRawData = (file) => {
  return {
    type: ActionTypes.USER_DELETE_RAW_DATA,
    payload: file,
  };
};

export const userEditRawData = (files) => {
  return {
    type: ActionTypes.USER_EDIT_RAW_DATA,
    payload: files,
  };
};

export const setUserProfile = (files) => {
  return {
    type: ActionTypes.SET_USER,
    payload: files,
  };
};
