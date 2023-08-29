import { useSelector } from "react-redux";
import { isEmpty } from "../helpers";

export const GET_CURRENT_USER = "GET_CURRENT_USER";

export const getCurrentUser = () => {
  return async (dispatch) => {
    const data = await JSON.parse(localStorage.getItem("user"));
    console.log(data);
    dispatch({ type: GET_CURRENT_USER, payload: data });
  };
};
