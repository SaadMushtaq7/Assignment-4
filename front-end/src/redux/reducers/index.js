import { combineReducers } from "redux";
import {
  filesReducer,
  userFilesReducer,
  userRawDataReducer,
} from "./filesReducer";
const reducers = combineReducers({
  allfiles: filesReducer,
  alluserfiles: userFilesReducer,
  allrawfiles: userRawDataReducer,
});
export default reducers;
