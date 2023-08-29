import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getStory } from "../../actions/storyAction";
import { isEmpty } from "../../helpers";
import CommentList from "./CommentList";
import { AnimatePresence, motion } from "framer-motion";

export default function CommentStory({ story, commentPopup, setCommentPopup }) {
  const users = useSelector((state) => state.userReducer);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  // current user
  let user;
  if (Array.isArray(users)) {
    user = users.find((user) => user.name === currentUser.name);
  }
  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(story._id, user._id, text, user.name))
        .then(() => dispatch(getStory()))
        .then(() => setText(""));
    }
  };

  return (
    <>
      {" "}
      <div className="commentStory">
        <img
          onClick={() => setCommentPopup(true)}
          src="/img/icons/message2.svg"
          alt=""
        />
        <span> {story.comments.length}</span>
      </div>{" "}
      {commentPopup && (
        <motion.div
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          className="popup-comment-container"
        >
          <div className="modal">
            {" "}
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
            <span className="post"> {story.post}</span>
            <img className="storyPicture coms" src={story.picture} alt="" />
            <h3>Commentaires</h3>
            <span className="cross" onClick={() => setCommentPopup(false)}>
              &#10005;
            </span>
            {story.comments.length < 1 && (
              <label className="preview">commenter en premier</label>
            )}{" "}
            <div className="comments">
              {story.comments &&
                story.comments.map((coms) => (
                  <CommentList
                    user={user}
                    key={coms._id}
                    coms={coms}
                    story={story}
                  />
                ))}
            </div>
            <form id="story" onSubmit={handleComment}>
              <textarea
                id="storyInput"
                cols="30"
                rows="1"
                placeholder="votre commentaire"
                onChange={(e) => setText(e.target.value)}
                value={text}
              ></textarea>
              <button type="submit">Commenter</button>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
}
