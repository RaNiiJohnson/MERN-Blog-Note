import { GET_CURRENT_USER } from "../actions/currentUserAction";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.payload;
    default:
      return state;
  }
}
