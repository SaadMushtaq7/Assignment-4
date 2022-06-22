import { combineReducers } from "redux";
import {
  filesReducer,
  forkReducer,
  starReducer,
  starRawDataReducer,
  userFilesReducer,
  userRawDataReducer,
  userReducer,
} from "./filesReducer";
const reducers = combineReducers({
  allfiles: filesReducer,
  alluserfiles: userFilesReducer,
  allrawfiles: userRawDataReducer,
  userProfile: userReducer,
  starfiles: starReducer,
  allstarrawfiles: starRawDataReducer,
  forkfiles: forkReducer,
});
export default reducers;
