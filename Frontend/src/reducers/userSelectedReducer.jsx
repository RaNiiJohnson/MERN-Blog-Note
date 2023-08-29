import {
  FOLLOW_USER,
  GET_USER_SELECTED,
  UNFOLLOW_USER,
} from "../actions/userSelectedAction";

const initialState = {};

export default function getUserSelectedReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SELECTED:
      return action.payload;
    case FOLLOW_USER:
      return {
        ...state,
        following: [action.payload.idToFollow, ...state.following],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (id) => id !== action.payload.idToUnfollow
        ),
      };
    default:
      return state;
  }
}
