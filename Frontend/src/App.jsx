import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import UserProfil from "./components/profilComponents/UserProfil";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UidContext } from "./helpers/AppContext";
import { getUserSelected } from "./actions/userSelectedAction";
import { isEmpty } from "./helpers";

export default function App() {
  const currentUser = useSelector((state) => state.currentUserReducer);
  const userData = useSelector((state) => state.userSelectedReducer);

  const [uid, setUid] = useState();
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchToken() {
      const res = await fetch("http://localhost:5000/jwtid", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      const data = await res.json(); // !!!
      if (res.ok) {
        console.log(data);
        setUid(data);
      } else console.log("no token");
    }

    if (!isEmpty(currentUser)) fetchToken();
    if (uid) {
      dispatch(getUserSelected(uid));
    } else return;
  }, [uid]);
  return (
    <UidContext.Provider value={uid}>
      <Nav active={active} setActive={setActive} />
      <Routes>
        <Route
          path="/"
          element={<Home active={active} setActive={setActive} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profil/:id" element={<UserProfil active={active} />} />
      </Routes>
    </UidContext.Provider>
  );
}
