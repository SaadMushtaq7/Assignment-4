import { ActionTypes } from "../constants/action-types";
const intialState = {
  files: [],
};

export const filesReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_FILES:
      return { ...state, files: payload };
    default:
      return state;
  }
};

export const userReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};

export const userFilesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_SET_FILES:
      return { ...state, files: payload };

    case ActionTypes.USER_DELETE_FILE: {
      const fileFilter = state.files.filter((file) => file.id !== payload.id);
      state.files = fileFilter;
      return state;
    }

    case ActionTypes.USER_EDIT_FILE: {
      const fileUpdate = state.files.filter((file) =>
        file.id === payload.id ? Object.assign(file, payload) : file
      );
      state.files = fileUpdate;
      return state;
    }

    default:
      return state;
  }
};

export const userRawDataReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.USER_SET_RAW_DATA:
      return { ...state, payload };

    case ActionTypes.USER_EDIT_RAW_DATA: {
      return state;
    }
    case ActionTypes.USER_DELETE_RAW_DATA: {
      const tempState = state.payload.splice(payload, 1);
      state.files = tempState;
      return state;
    }
    default:
      return state;
  }
};
export const starReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_STAR_FILES:
      return { ...state, files: payload };

    case ActionTypes.ADD_STAR_FILE: {
      const addFiles = [...state.files, payload];
      state.files = addFiles;
      return state;
    }
    case ActionTypes.DELETE_STAR_FILES: {
      const fileFilter = state.files.filter((file) => file.id !== payload.id);
      state.files = fileFilter;
      return state;
    }
    default:
      return state;
  }
};

export const starRawDataReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_STAR_RAW_DATA:
      return { ...state, payload };

    case ActionTypes.DELETE_STAR_RAW_DATA: {
      const tempState = state.payload.splice(payload, 1);
      state.files = tempState;
      return state;
    }
    default:
      return state;
  }
};

export const forkReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_FORK_FILES: {
      const addFork = [...state, payload];
      state = addFork;
      return state;
    }
    default:
      return state;
  }
};
