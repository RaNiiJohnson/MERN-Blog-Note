import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeStory, unLikeStory } from "../../actions/storyAction";

export default function LikeStory({
  story,
  isLiked,
  setIsLiked,
  setLikePopup,
  likePopup,
  user,
}) {
  (state) => state.currentUserReducer;
  const dispatch = useDispatch();

  async function handleClickLike() {
    dispatch(likeStory(story._id, user._id));
    setIsLiked(true);
  }

  async function handleClickUnLike() {
    dispatch(unLikeStory(story._id, user._id));
    setIsLiked(false);
  }

  return (
    <div className="likeStory">
      {user && !isLiked && (
        <img onClick={handleClickLike} src="/img/icons/heart.svg" alt="" />
      )}
      {user && isLiked && (
        <img
          onClick={handleClickUnLike}
          src="/img/icons/heart-filled.svg"
          alt=""
        />
      )}
      <span onClick={() => setLikePopup(!likePopup)}>
        {" "}
        {story.likers.length}
      </span>
    </div>
  );
}
