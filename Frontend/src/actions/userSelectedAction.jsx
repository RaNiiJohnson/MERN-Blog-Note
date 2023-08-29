import axios from "axios";

export const GET_USER_SELECTED = "GET_USER_SELECTED";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const getUserSelected = (uid) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`http://localhost:5000/user/${uid}`);
      dispatch({ type: GET_USER_SELECTED, payload: res.data });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `http://localhost:5000/user/follow/` + followerId,
      data: { idToFollow },
    })
      .then((res) => {
        dispatch({ type: FOLLOW_USER, payload: { followerId, idToFollow } });
      })
      .catch((err) => console.log(err));
  };
};

export const unfollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `http://localhost:5000/user/unfollow/` + followerId,
      data: { idToUnfollow },
    })
      .then((res) => {
        dispatch({
          type: UNFOLLOW_USER,
          payload: { followerId, idToUnfollow },
        });
      })
      .catch((err) => console.log(err));
  };
};
