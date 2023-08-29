import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStory } from "../actions/storyAction";
import FormStory from "../components/FormStory";
import LeftNav from "../components/LeftNav";
import Profil from "../components/Profil";
import StoryList from "../components/StoryList";
import UserList from "../components/UserList";
import { isEmpty } from "../helpers";
import { AnimatePresence } from "framer-motion";

export default function Home({ active }) {
  // const story = useSelector((state) => state.userReducer);
  const [show, setShow] = useState(false);
  const [loadStory, setLoadStory] = useState(true);
  const [count, setCount] = useState(5);
  const storyScrollRef = useRef(null);
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.storyReducer);
  const currentUser = useSelector((state) => state.currentUserReducer);
  /**
   *  document.scrollingElement.scrollHeight => toute le scroll / toute la taille de toute ce qui est scrollable
   * window.innerHeight + document.documentElement.scrollTop + 1  => l'endroit ou on est exactement
   *   const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadStory(true);
    }
  };
   */
  const loadMore = () => {
    const element = storyScrollRef.current;
    console.log(element.clientHeight + element.scrollTop + 3);
    console.log(element.scrollHeight);
    if (
      element &&
      element.clientHeight + element.scrollTop + 3 > element.scrollHeight
    ) {
      setLoadStory(true);
    }
  };

  useEffect(() => {
    if (loadStory) {
      dispatch(getStory(count));
      setLoadStory(false);
      setCount(count + 5);
    }

    const element = storyScrollRef.current;
    if (element) {
      element.addEventListener("scroll", loadMore);
      return () => element.removeEventListener("scroll", loadMore);
    } else return;
  }, [loadStory, dispatch, count]);
  return (
    <div className="home">
      {isEmpty(currentUser) && (
        <div className="header">
          <div className="blogNote">
            <p>~ blog ~</p>
            <h1>note</h1>
          </div>
          <h1 className="h1">
            Comment s'est passé votre journée <span>?</span>
            <br />
          </h1>
          <p className="p">
            Commencez votre voyage en partageant vos moments les plus mémorable
            et vos inspirations grâce à "BLOG-NOTE".
          </p>
        </div>
      )}
      {!isEmpty(currentUser) && (
        <div className="main">
          <LeftNav show={show} setShow={setShow} />
          <section className="storyScroll" ref={storyScrollRef}>
            <div className="storyList">
              <FormStory />
              <AnimatePresence>
                {!isEmpty(stories) &&
                  stories.map((story) => (
                    <StoryList key={story._id} story={story} />
                  ))}
              </AnimatePresence>
            </div>
          </section>
          <section className={active ? "rigthSide show" : "rigthSide"}>
            <Profil />
            <UserList />
          </section>
        </div>
      )}
      {/* {!isEmpty(currentUser) && !loaded && <div>loading...</div>} */}
    </div>
  );
}
