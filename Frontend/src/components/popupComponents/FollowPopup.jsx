import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../helpers";
import FollowHandler from "../profilComponents/FollowHandler";
import { motion as m } from "framer-motion";

export default function FollowPopup({
  followingPopup,
  setFollowingPopup,
  followersPopup,
  setFollowersPopup,
  users,
  selectedUser,
}) {
  const userData = useSelector((state) => state.userSelectedReducer);
  return (
    <m.div>
      {" "}
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span onClick={() => setFollowingPopup(false)} className="cross">
              &#10005;
            </span>
            <ul>
              {!isEmpty(users) &&
                Array.isArray(users) &&
                users.map((user) => {
                  for (let i = 0; i < selectedUser.following.length; i++) {
                    if (user._id === selectedUser.following[i]) {
                      return (
                        <li key={user._id}>
                          <img src={user.picture} alt="user-pic" />
                          <h4>{user.name}</h4>
                          {userData.name !== user.name && (
                            <div className="follo-handler">
                              <FollowHandler
                                type={"popup"}
                                followingPopup={followingPopup}
                                idToFollow={user._id}
                              />
                            </div>
                          )}
                        </li>
                      );
                    }
                  }
                })}
            </ul>
          </div>
        </div>
      )}
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnées</h3>
            <span onClick={() => setFollowersPopup(false)} className="cross">
              &#10005;
            </span>
            <ul>
              {!isEmpty(users) &&
                Array.isArray(users) &&
                users.map((user) => {
                  for (let i = 0; i < selectedUser.followers.length; i++) {
                    if (user._id === selectedUser.followers[i]) {
                      return (
                        <li key={user._id}>
                          <img src={user.picture} alt="user-pic" />
                          <h4>{user.name}</h4>
                          {userData.name !== user.name && (
                            <div className="follow-handler">
                              <FollowHandler
                                type={"popup"}
                                followingPopup={followingPopup}
                                idToFollow={user._id}
                              />
                            </div>
                          )}
                        </li>
                      );
                    }
                  }
                })}
            </ul>
          </div>
        </div>
      )}
    </m.div>
  );
}
