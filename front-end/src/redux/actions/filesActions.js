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

export const setStarFiles = (files) => {
  return {
    type: ActionTypes.SET_STAR_FILES,
    payload: files,
  };
};

export const addStarFile = (file) => {
  return {
    type: ActionTypes.ADD_STAR_FILE,
    payload: file,
  };
};
export const setStarredRawData = (files) => {
  return {
    type: ActionTypes.SET_STAR_RAW_DATA,
    payload: files,
  };
};

export const deleteStarredRawData = (file) => {
  return {
    type: ActionTypes.DELETE_STAR_RAW_DATA,
    payload: file,
  };
};
export const deleteStarFiles = (files) => {
  return {
    type: ActionTypes.DELETE_STAR_FILES,
    payload: files,
  };
};

export const setForkFiles = (files) => {
  return {
    type: ActionTypes.SET_FORK_FILES,
    payload: files,
  };
};
