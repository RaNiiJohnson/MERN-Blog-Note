import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Nav({ active, setActive }) {
  const currentUser = useSelector((state) => state.currentUserReducer);

  function handleLogout() {
    localStorage.removeItem("user");
    window.location = "/login";
  }

  const body = document.querySelector("body");
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (body.clientWidth > 860) {
        setActive(false);
      }
    });
  }, [body.clientWidth]);

  return (
    <nav className={active ? "click" : ""}>
      <Link to="/">Blog-Note</Link>
      <ul className="navLinks">
        {!currentUser ? (
          <>
            {" "}
            <li
              onClick={() => {
                setActive(false);
              }}
              className="item"
            >
              {" "}
              <NavLink to="/login">Se connecter</NavLink>
            </li>
            <li
              onClick={() => {
                setActive(false);
              }}
              className="item"
            >
              <NavLink to="/signup">S'inscrire</NavLink>
            </li>
          </>
        ) : (
          <li
            onClick={() => {
              setActive(false);
            }}
            className="item logout"
          >
            <span style={{ cursor: "pointer" }} onClick={handleLogout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-logout"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#475487"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                <path d="M7 12h14l-3 -3m0 6l3 -3" />
              </svg>
            </span>
          </li>
        )}
      </ul>

      <div
        className="trio"
        onClick={() => {
          setActive(!active);
        }}
      >
        <div className="on c01"></div>
        <div className="on c02"></div>
        <div className="on c03"></div>
      </div>
    </nav>
  );
}
