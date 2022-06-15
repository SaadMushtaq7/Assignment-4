import { combineReducers } from "redux";
import {
  filesReducer,
  userFilesReducer,
  userRawDataReducer,
  userReducer,
} from "./filesReducer";
const reducers = combineReducers({
  allfiles: filesReducer,
  alluserfiles: userFilesReducer,
  allrawfiles: userRawDataReducer,
  userProfile: userReducer,
});
export default reducers;
