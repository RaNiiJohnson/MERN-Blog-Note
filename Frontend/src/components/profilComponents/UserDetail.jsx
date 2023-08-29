import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import FollowPopup from "../popupComponents/FollowPopup";
import FollowHandler from "./FollowHandler";

export default function UserDetail({ selectedUser }) {
  const users = useSelector((state) => state.userReducer);
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  return (
    <div className="formStory profil">
      <section className="userTop profil">
        <div className="pictureCircle">
          <img
            key={selectedUser.name}
            src={selectedUser.picture}
            className="pictureCircle"
          />
        </div>
        <p className="userName">{selectedUser.name}</p>
      </section>
      <section className="userBottom">
        <div className="out">
          <h4 onClick={() => setFollowingPopup(true)}>
            Abonnement
            {selectedUser.following && selectedUser.following.length > 1
              ? "s"
              : null}
            :{" "}
            <span>
              {selectedUser.following ? selectedUser.following.length : "0"}
            </span>
          </h4>
          <h4 onClick={() => setFollowersPopup(true)}>
            Abonnée
            {selectedUser.followers && selectedUser.followers.length > 1
              ? "s"
              : null}
            :{" "}
            <span>
              {selectedUser.followers ? selectedUser.followers.length : "0"}
            </span>
          </h4>
        </div>
        <FollowHandler type={"userDetail"} idToFollow={selectedUser._id} />
      </section>
      <FollowPopup
        followingPopup={followingPopup}
        followersPopup={followersPopup}
        setFollowingPopup={setFollowingPopup}
        setFollowersPopup={setFollowersPopup}
        users={users}
        selectedUser={selectedUser}
      />
    </div>
  );
}
