import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../helpers";
import DeleteComment from "./DeleteComment";
import { motion as m } from "framer-motion";

export default function CommentList({ user, coms, story }) {
  const users = useSelector((state) => state.userReducer);
  const currentUser = useSelector((state) => state.currentUserReducer);

  return (
    <m.div
      initial={{ opacity: 0, x: -100, scale: 0.6 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{
        duration: "0.4",
      }}
      exit={{ opacity: 0, scale: 0.6, x: -100 }}
      className={
        coms.commenterPseudo === currentUser.name
          ? "commentList user"
          : "commentList"
      }
    >
      <img
        src={
          !isEmpty(users) && Array.isArray(users)
            ? users
                .map((user) => {
                  if (coms.commenterPseudo === user.name) {
                    return user.picture;
                  } else return "";
                })
                .join("")
            : ""
        }
        alt="user-picture"
      />
      <div>
        <h4>{coms.commenterPseudo} : </h4> {coms.text}
        {user.name === coms.commenterPseudo && (
          <DeleteComment story={story} coms={coms} user={user} />
        )}
      </div>
    </m.div>
  );
}
