import { AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStory } from "../../actions/storyAction";
import { isEmpty } from "../../helpers";
import FormStory from "../FormStory";
import LeftNav from "../LeftNav";
import Profil from "../Profil";
import StoryList from "../StoryList";
import UserList from "../UserList";
import UserDetail from "./UserDetail";

export default function UserProfil({ active }) {
  const { id } = useParams();
  const users = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const selectedUser =
    Array.isArray(users) && !isEmpty(users)
      ? users.find((user) => user._id === id)
      : "";
  const stories = useSelector((state) => state.storyReducer);

  useEffect(() => {
    dispatch(getStory());
  }, [id]);

  return (
    <div>
      <div className="main profil">
        <LeftNav />
        <section className="storyScroll">
          <div className="storyList profil">
            <UserDetail selectedUser={selectedUser} />
            <AnimatePresence mode="wait">
              {!isEmpty(stories) &&
                Array.isArray(stories) &&
                stories
                  .filter((story) => story.author === selectedUser.name)
                  .map((story) => <StoryList key={story._id} story={story} />)}
            </AnimatePresence>
          </div>
        </section>{" "}
        <section className={active ? "rigthSide show" : "rigthSide"}>
          <Profil />
          <UserList />
        </section>
      </div>
    </div>
  );
}
