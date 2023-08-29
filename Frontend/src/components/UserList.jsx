import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "../helpers";
import FollowHandler from "./profilComponents/FollowHandler";

export default function UserList({ user }) {
  const users = useSelector((state) => state.userReducer);
  const currentUser = useSelector((state) => state.currentUserReducer);

  return (
    <div className="userList">
      <h5>Suggestion de profil</h5>
      {!isEmpty(users) &&
        Array.isArray(users) &&
        users.map((user) => {
          if (user.name !== currentUser.name) {
            return (
              <div key={user.name} className="userItem">
                <Link to={`/profil/${user._id}`} className="pseudo">
                  <img src={user.picture} alt="" />
                  <div>
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                  </div>
                </Link>
                <FollowHandler type={"userList"} idToFollow={user._id} />
              </div>
            );
          }
        })}
    </div>
  );
}
