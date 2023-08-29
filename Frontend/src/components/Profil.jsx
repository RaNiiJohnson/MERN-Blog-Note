import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { uploadPicture } from "../actions/userAction";
import { isEmpty } from "../helpers";
import FollowPopup from "./popupComponents/FollowPopup";

export default function Profil() {
  const userData = useSelector((state) => state.userSelectedReducer);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const users = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [profil, setProfil] = useState("");
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  const onInputChange = (e) => {
    setProfil(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", file);

    const res = await fetch("http://localhost:5000/user/upload/", {
      method: "POST",
      body: formData,
      withCredentials: true,
      "content-Type": "multipart/form-data",
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      console.log("error");
    } else {
      dispatch(uploadPicture(data));
      setProfil("");
      setFile("");
    }
  };

  return (
    <>
      {" "}
      <form className="userProfil">
        <input
          type="file"
          name="photo"
          onChange={onInputChange}
          id="file2"
          accept=".jpg, .jpeg, .png"
        />
        <div id="l1" htmlFor="file2">
          {" "}
          {!isEmpty(users) &&
            Array.isArray(users) &&
            users.map((user) => {
              if (user.name === currentUser.name) {
                return (
                  <div key={user.name}>
                    <img
                      key={user.name}
                      src={!profil ? user.picture : profil}
                      className="pictureCircle"
                    />{" "}
                    <label id="l2" htmlFor="file2">
                      <svg
                        stroke="#475487"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="image"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
                        <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                      </svg>{" "}
                    </label>
                    {profil && (
                      <div onClick={handleClick}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="save"
                          width="44"
                          height="44"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#475487"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              } else return "";
            })}
        </div>
        <h2>{currentUser.name}</h2>
        <h4 onClick={() => setFollowingPopup(true)}>
          Abonnement
          {userData.following && userData.following.length > 1
            ? "s"
            : null} :{" "}
          <span>{userData.following ? userData.following.length : "0"}</span>
        </h4>
        <h4 onClick={() => setFollowersPopup(true)}>
          Abonnée
          {userData.followers && userData.followers.length > 1
            ? "s"
            : null} :{" "}
          <span>{userData.followers ? userData.followers.length : "0"}</span>
        </h4>
      </form>{" "}
      <FollowPopup
        followingPopup={followingPopup}
        followersPopup={followersPopup}
        setFollowingPopup={setFollowingPopup}
        setFollowersPopup={setFollowersPopup}
        users={users}
        selectedUser={userData}
      />
    </>
  );
}
