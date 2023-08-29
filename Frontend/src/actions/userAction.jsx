import axios from "axios";

export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
// export const FOLLOW_USER = "FOLLOW_USER";
// export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const getUser = () => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:5000/user", {
      method: "GET",
      withCredentials: true,
      headers: { "content-Type": "application/json" },
    });
    const data = await res.json();
    data.sort(() => Math.random() - 0.5);
    dispatch({ type: GET_USER, payload: data }); //data tout court ;) :D
  };
};

export const useSignup = (data) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP, payload: data });
  };
};

export const useLogin = (data) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN, payload: data });
  };
};

export const uploadPicture = (data) => {
  return async (dispatch) => {
    dispatch({ type: UPLOAD_PICTURE, payload: data });
  };
};

// export const followUser = (followerId, idToFollow) => {
//   return (dispatch) => {
//     return axios({
//       method: "patch",
//       url: `http://localhost:5000/user/follow/` + followerId,
//       data: { idToFollow },
//     })
//       .then((res) => {
//         dispatch({ type: FOLLOW_USER, payload: { followerId, idToFollow } });
//       })
//       .catch((err) => console.log(err));
//   };
// };

// export const unfollowUser = (followerId, idToUnfollow) => {
//   return (dispatch) => {
//     return axios({
//       method: "patch",
//       url: `http://localhost:5000/user/unfollow/` + followerId,
//       data: { idToUnfollow },
//     })
//       .then((res) => {
//         dispatch({
//           type: UNFOLLOW_USER,
//           payload: { followerId, idToUnfollow },
//         });
//       })
//       .catch((err) => console.log(err));
//   };
// };
