import React from "react";

export default function ({ currentUser, story }) {
  return (
    <div>
      {" "}
      <div className="icon">
        <i className="fas fa-heart"></i>
        <i className="fas fa-comment"></i>
        {currentUser.name === story.author && (
          <>
            <i className="fas fa-times"></i>
          </>
        )}
      </div>
    </div>
  );
}
