import React from "react";

export default function LeftNav({ show, setShow }) {
  return (
    <div className="left-nav-conatiner">
      <div className="leftNav">
        <img src="/img/icons/home.svg" />
        <img src="/img/icons/user.svg" />
        <img src="/img/icons/picture.svg" />
      </div>
    </div>
  );
}
