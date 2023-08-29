import React, { useEffect } from "react";
import { isEmpty } from "../../helpers";
import { motion as m } from "framer-motion";

export default function LikersPopup({ users, story }) {
  const comments = story.comments.map((coms) => coms);

  return (
    <m.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: "0.4",
      }}
      className="likers-popup"
    >
      <div className="modal">
        <ul>
          {!isEmpty(users) &&
            Array.isArray(users) &&
            story.likers.map((liker, index) => {
              return users.map((user) => {
                if (liker === user._id) {
                  return (
                    <m.li
                      initial={{ opacity: 0, x: -100, scale: 0.6 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{
                        duration: "0.1",
                        delay: index / 10,
                      }}
                      key={user._id}
                    >
                      <img className="pic" src={user.picture} alt="user-pic" />
                      <h4>{user.name}</h4>
                      <img
                        className="like"
                        src="/img/icons/heart-filled.svg"
                        alt=""
                      />
                      <h5>
                        {story.comments &&
                          story.comments.map((coms) => {
                            if (coms.commenterPseudo === user.name) {
                              return (
                                coms.text.split(" ").slice(0, 2).join(" ") +
                                " ...."
                              );
                            }
                          })}
                      </h5>
                    </m.li>
                  );
                }
              });
            })}
          {story.comments &&
            story.comments.map((coms) => {
              if (!story.likers.includes(coms.commenterId))
                return (
                  <li key={coms._id}>
                    <img
                      src={users
                        .map((user) => {
                          if (coms.commenterId === user._id) {
                            return user.picture;
                          } else return;
                        })
                        .join("")}
                      alt=""
                      className="pic"
                    />
                    <h4>{coms.commenterPseudo}</h4>
                    <h5>
                      {coms.text.split(" ").slice(0, 2).join(" ") + " ...."}
                    </h5>
                  </li>
                );
            })}
        </ul>
      </div>
    </m.div>
  );
}
