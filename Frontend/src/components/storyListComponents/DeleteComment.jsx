import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../actions/storyAction";

export default function DeleteComment({ story, user, coms }) {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteComment(story._id, coms._id));

  return (
    <img
      src="../../../public/img/icons/trash.svg"
      alt=""
      onClick={() => {
        if (window.confirm("Voulez-vous vraiment supprimer ce commentaire ?")) {
          handleDelete();
        }
      }}
    />
  );
}
