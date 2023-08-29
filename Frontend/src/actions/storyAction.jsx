import axios from "axios";

//stories
export const GET_STORY = "GET_STORY";
export const ADD_STORY = "ADD_STORY";
export const DELETE_STORY = "DELETE_STORY";
export const LIKE_STORY = "LIKE_STORY";
export const UNLIKE_STORY = "UNLIKE_STORY";

//comments
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getStory = (num) => {
  return async (dispatch) => {
    const res = await fetch("http://localhost:5000/story", {
      method: "GET",
      withCredentials: true,
      headers: {
        "content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(res.error);
    }
    if (num) {
      const array = data.slice(0, num);
      dispatch({ type: GET_STORY, payload: array });
    } else {
      const array = data;
      dispatch({ type: GET_STORY, payload: array });
    }
  };
};

export const addStory = (data) => {
  return async (dispatch) => {
    dispatch({ type: ADD_STORY, payload: data });
  };
};

export const likeStory = (storyId, userId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "patch",
        url: "http://localhost:5000/story/like-post/" + storyId,
        data: { id: userId },
      });
      console.log("like");
      dispatch({ type: LIKE_STORY, payload: { storyId, userId } });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const unLikeStory = (storyId, userId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "patch",
        url: "http://localhost:5000/story/unlike-post/" + storyId,
        data: { id: userId },
      });
      console.log("unlike");
      dispatch({ type: UNLIKE_STORY, payload: { storyId, userId } });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const deleteStory = (data) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_STORY, payload: data });
  };
};

export const addComment = (storyId, commenterId, text, commenterPseudo) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "patch",
        url: "http://localhost:5000/story/comment-post/" + storyId,
        data: { id: commenterId, text: text, name: commenterPseudo },
      });
      console.log("unlike");
      dispatch({
        type: ADD_COMMENT,
        payload: { storyId },
      });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const deleteComment = (storyId, commentId) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "patch",
        url: "http://localhost:5000/story/delete-comment-post/" + storyId,
        data: { commentId: commentId },
      });
      console.log("delete");
      dispatch({
        type: DELETE_COMMENT,
        payload: { storyId, commentId },
      });
    } catch (err) {
      return console.log(err);
    }
  };
};
