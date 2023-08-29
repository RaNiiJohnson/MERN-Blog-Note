import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSignup } from "../actions/userAction";

export default function Signup() {
  const form = useRef();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const pseudoError = document.querySelector(".pseudo.error");

    const formData = {
      name: form.current[0].value,
      email: form.current[1].value,
      password: form.current[2].value,
    };
    const res = await fetch("http://localhost:5000/user/signup", {
      method: "POST",
      body: JSON.stringify(formData),
      withCredentials: true,
      headers: { "content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
      pseudoError.textContent = data.errors.name;
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(useSignup(data));
      window.location = "/";
      console.log(data);
    }
  };
  return (
    <div className="section">
      <form className="container" ref={form}>
        <div className="form">
          <h1>Insciption</h1>
          <input className="input" type="text" placeholder="Prénom" required />
          <div className="line lined"></div>

          <div className="pseudo error"></div>

          <input className="input" type="text" placeholder="E-mail" required />
          <div className="line lined"></div>

          <div className="email error"></div>

          <input type="password" placeholder="Mot de passe" required />
          <div className="line"></div>
          <div className="password error"></div>
          <button className="button" onClick={handleClick}>
            S'inscrire
          </button>
          <div className="error">{error}</div>
        </div>
      </form>
    </div>
  );
}
