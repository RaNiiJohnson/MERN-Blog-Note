import { combineReducers } from "redux";
import userReducer from "./userReducer";
import storyReducer from "./storyReducer";
import currentUserReducer from "./currentUserReducer";
import userSelectedReducer from "./userSelectedReducer";

export default combineReducers({
  userReducer,
  storyReducer,
  currentUserReducer,
  userSelectedReducer,
});
