import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStory } from "../../actions/storyAction";

export default function DeleteStory({ story }) {
  const user = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();

  const handleClick = async () => {
    const res = await fetch("http://localhost:5000/story/" + story._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await res.json();

    console.log(data);
    dispatch(deleteStory(data));
  };

  return (
    <div>
      <img
        src="/img/icons/trash.svg"
        alt="delete-story"
        onClick={handleClick}
      />
    </div>
  );
}
