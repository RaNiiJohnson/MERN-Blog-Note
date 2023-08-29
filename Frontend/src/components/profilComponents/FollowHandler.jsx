import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/userSelectedAction";

// import { followUser, unfollowUser } from "../../actions/userAction";

import { isEmpty } from "../../helpers";

export default function FollowHandler({ idToFollow, type }) {
  const userData = useSelector((state) => state.userSelectedReducer);
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow)); // userData._id, no tokon makao am folloer
    setIsFollowed(true);
  };
  const handleUnFollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {!isEmpty(userData) && type === "userList" && isFollowed && (
        <span onClick={handleUnFollow} className="unfollow-btn">
          Abonné
        </span>
      )}
      {!isEmpty(userData) && type === "userList" && !isFollowed && (
        <span onClick={handleFollow} className="follow-btn">
          Suivre...
        </span>
      )}
      {!isEmpty(userData) && type === "userDetail" && isFollowed && (
        <button className="profil unfollow-btn" onClick={handleUnFollow}>
          Abonné
        </button>
      )}
      {!isEmpty(userData) && type === "userDetail" && !isFollowed && (
        <button className="profil follow-btn" onClick={handleFollow}>
          Suivre...
        </button>
      )}
      {!isEmpty(userData) && type === "popup" && isFollowed && (
        <span onClick={handleUnFollow} className="popup-unfollow-btn">
          Abonné
        </span>
      )}
      {!isEmpty(userData) && type === "popup" && !isFollowed && (
        <span onClick={handleFollow} className="popup-follow-btn">
          Suivre...
        </span>
      )}
    </>
  );
}
