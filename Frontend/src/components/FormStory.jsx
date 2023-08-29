import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStory } from "../actions/storyAction";
import { isEmpty } from "../helpers";

export default function FormStory() {
  const dispatch = useDispatch();
  const maStory = useRef();
  const users = useSelector((state) => state.userReducer);
  const currentUser = useSelector((state) => state.currentUserReducer);

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);

  // current user
  let user;
  if (Array.isArray(users)) {
    user = users.find((user) => user.name === currentUser.name);
  }

  const onInputChange = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const resetForm = () => {
    setPostPicture("");
    setMessage("");
    setFile("");
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("post", maStory.current[0].value);
    formData.append("photo", file);

    const res = await fetch("http://localhost:5000/story/upload/", {
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
      console.log(res);
    } else {
      console.log("upload hff");
      setPostPicture("");
      setMessage("");
      setFile("");
      dispatch(addStory(data));
      resetForm();
    }

    maStory.current.reset();
  };

  const handleClickPost = async (e) => {
    e.preventDefault();

    const post = maStory.current[0].value;

    const res = await fetch("http://localhost:5000/story/post/", {
      method: "POST",
      body: JSON.stringify({ post }),

      headers: {
        Authorization: `Bearer ${currentUser.token}`,
        "content-Type": "application/json", // dont forget this on post
      },
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(res);
    } else {
      console.log("post tsotra");
      console.log(data);
      setPostPicture("");
      setMessage("");
      setFile("");
      dispatch(addStory(data));
      resetForm();
    }

    maStory.current.reset();
  };

  return (
    <div className="formStory">
      <div className="userTop">
        <div className="pictureCircle">
          {!isEmpty(users) &&
            Array.isArray(users) &&
            users.map((user) => {
              if (user.name === currentUser.name) {
                return (
                  <img
                    key={user.name}
                    src={user.picture}
                    className="pictureCircle"
                  />
                );
              } else return "";
            })}
        </div>

        <p className="userName">{currentUser.name}</p>
      </div>
      <form id="story" ref={maStory}>
        <textarea
          name="message"
          id="storyInput"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          cols="30"
          rows="1"
          required
        ></textarea>
        <label id="l1" htmlFor="storyInput">
          Ma journée
        </label>
        {message || postPicture ? (
          <>
            <div className=" preview-post">
              <img src={user.picture} className="pictureCircle" alt="" />
              <p className="post">{message}</p>
              <img src={postPicture} className="storyPicture" alt="" />
            </div>
          </>
        ) : null}
        <input
          type="file"
          name="photo"
          onChange={onInputChange}
          accept=".jpg, .jpeg, .png"
          id="file"
        />
        <label id="l2" htmlFor="file">
          <img src="/img/icons/picture.svg" alt="" />
        </label>{" "}
        {message || postPicture ? (
          <span className="reset" onClick={resetForm}>
            annuler
          </span>
        ) : (
          ""
        )}
        {file && <button onClick={handleClick}>Partager</button>}
        {!file && <button onClick={handleClickPost}>Partage</button>}
      </form>
    </div>
  );
}
