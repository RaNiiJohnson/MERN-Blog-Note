import React from "react";
import { useSelector } from "react-redux";
import { dateParser, isEmpty } from "../helpers"; // date fns
import DeleteStory from "./storyListComponents/DeleteStory";
import LikeStory from "./storyListComponents/LikeStory";
import CommentStory from "./storyListComponents/CommentStory";
import { useState } from "react";
import LikersPopup from "./popupComponents/LikersPopup";
import { useEffect } from "react";
import { AnimatePresence, motion as m } from "framer-motion";

export default function StoryList({ story }) {
  const [commentPopup, setCommentPopup] = useState(false);
  const [picturePopup, setPicturePopup] = useState(false);
  const [likePopup, setLikePopup] = useState(false);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const users = useSelector((state) => state.userReducer);
  const [isLiked, setIsLiked] = useState(false);

  let user;
  if (Array.isArray(users)) {
    user = users.find((user) => user.name === currentUser.name);
  }
  useEffect(() => {
    if (Array.isArray(users) && user) {
      const liked = story.likers.includes(user._id);
      if (liked) setIsLiked(true);
      else setIsLiked(false);
    }
  }, [story.likers, user]);

  return (
    <m.div
      initial={{ opacity: 0, y: -100, x: -120, scale: 0.6 }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      // whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6, x: 200 }}
      transition={{
        duration: "0.4",
      }}
      className="storyItem"
    >
      <div
        className="back-picture-post"
        style={{
          position: "absolute",
          background: `url(${story.picture}) center/cover`,
          bottom: "39px",
          width: "90%",
          right: "10px",
          height: "68%",
          borderRadius: "0 0 10px 10px",
          zIndex: 0,
        }}
      ></div>
      <img
        className="authorPicture"
        src={
          !isEmpty(users) && Array.isArray(users)
            ? users
                .map((user) => {
                  if (story.author === user.name) {
                    return user.picture;
                  } else return "";
                })
                .join("")
            : ""
        }
        alt="user-picture"
      />
      <div className="author">
        <span>Publier par </span>
        {currentUser.name === story.author ? "vous" : story.author}
      </div>

      <span className="dateStory">
        <span>le</span> {dateParser(story.createdAt)}
      </span>
      <p className="post">{story.post}</p>

      <img
        className="storyPicture"
        src={story.picture}
        onClick={() => {
          if (user) setPicturePopup(true);
        }}
        alt=""
      />
      <div className="react">
        <LikeStory
          story={story}
          users={users}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          setLikePopup={setLikePopup}
          likePopup={likePopup}
          user={user}
        />
        <CommentStory
          commentPopup={commentPopup}
          setCommentPopup={setCommentPopup}
          story={story}
        />
      </div>
      {currentUser.name === story.author && (
        <div className="react2">
          <DeleteStory story={story} />
          {/* <img src="/img/icons/edit.svg" alt="" /> */}
        </div>
      )}
      {likePopup && (
        <LikersPopup
          users={users}
          currentUser={currentUser}
          story={story}
          setLikePopup={setLikePopup}
        />
      )}
      {picturePopup && (
        <div className="picture-popup">
          <div style={{ position: "relative" }} className="modal">
            <h1>{story.author}</h1>
            <LikeStory
              story={story}
              users={users}
              isLiked={isLiked}
              setIsLiked={setIsLiked}
              setLikePopup={setLikePopup}
              likePopup={likePopup}
              user={user}
            />
            <span onClick={() => setPicturePopup(false)} className="cross">
              &#10005;
            </span>
            <img className="img" src={story.picture} alt="" />
            <div
              style={{
                position: "absolute",
                background: `url(${story.picture}) center/cover`,
                top: "40px",
                bottom: "0",
                width: "100%",
                right: "0",
                height: "90%",
                objectFit: "cover",
                borderRadius: "0 0 10px 10px",
                filter: "blur(30px)",
                zIndex: -1,
              }}
            ></div>
          </div>
        </div>
      )}
    </m.div>
  );
}
