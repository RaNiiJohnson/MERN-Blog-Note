import {
  // FOLLOW_USER,
  GET_USER,
  LOGIN,
  SIGNUP,
  // UNFOLLOW_USER,
  UPLOAD_PICTURE,
} from "../actions/userAction";
import { FOLLOW_USER, UNFOLLOW_USER } from "../actions/userSelectedAction";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case LOGIN:
      return action.payload;
    case SIGNUP:
      return action.payload;
    case UPLOAD_PICTURE:
      return state.map((user) => {
        if (user._id === action.payload._id) {
          return action.payload;
        } else
          return {
            ...user,
          };
      });
    case FOLLOW_USER:
      return state.map((user) => {
        if (user._id === action.payload.followerId) {
          return {
            ...user,
            following: [action.payload.idToFollow, ...user.following],
          };
        } else if (user._id === action.payload.idToFollow) {
          return {
            ...user,
            followers: [action.payload.followerId, ...user.followers],
          };
        } else {
          return {
            ...user,
          };
        }
      });
    case UNFOLLOW_USER:
      return state.map((user) => {
        if (user._id === action.payload.followerId) {
          return {
            ...user,
            following: user.following.filter(
              (id) => id !== action.payload.idToUnfollow
            ),
          };
        } else if (user._id === action.payload.idToUnfollow) {
          return {
            ...user,
            followers: user.followers.filter(
              (id) => id !== action.payload.followerId
            ),
          };
        } else {
          return {
            ...user,
          };
        }
      });
    default:
      return state;
  }
}
