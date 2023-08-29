import {
  ADD_STORY,
  DELETE_COMMENT,
  DELETE_STORY,
  GET_STORY,
  LIKE_STORY,
  UNLIKE_STORY,
} from "../actions/storyAction";

const initialState = {};

export default function storyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STORY:
      return action.payload;
    case ADD_STORY:
      return [action.payload, ...state];
    case LIKE_STORY:
      return state.map((story) => {
        if (story._id === action.payload.storyId) {
          return {
            ...story,
            likers: [...story.likers, action.payload.userId],
          };
        } else
          return {
            ...story,
          };
      });
    case UNLIKE_STORY:
      return state.map((story) => {
        if (story._id === action.payload.storyId) {
          return {
            ...story,
            likers: story.likers.filter(
              (like) => like !== action.payload.userId
            ),
          };
        }
        return {
          ...story,
        };
      });
    case DELETE_STORY:
      return state.filter((story) => story._id !== action.payload._id);
    case DELETE_COMMENT:
      return state.map((story) => {
        if (story._id === action.payload.storyId) {
          return {
            ...story,
            comments: story.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        } else
          return {
            ...story,
          };
      });
    default:
      return state;
  }
}
