import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useLogin } from "../actions/userAction";

export default function Login() {
  const [error, setError] = useState("");
  const form = useRef();
  const emailValue = useRef();
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    const userData = {
      email: form.current[0].value,
      password: form.current[1].value,
    };
    const res = await fetch("http://localhost:5000/user/login", {
      method: "POST",
      body: JSON.stringify(userData),
      withCredentials: true,
      headers: {
        "content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.errors) {
      emailError.textContent = data.errors.email;
      passwordError.textContent = data.errors.password;
    } else {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(useLogin(data));
      window.location = "/";
    }
  };
  return (
    <div className="section">
      <form className="container" ref={form}>
        <div className="form">
          <h1>Connexion</h1>
          <input
            name="email"
            className="input"
            type="text"
            placeholder="E-mail"
            ref={emailValue}
            required
          />
          <div className="line"></div> <div className="email error"></div>
          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            required
          />
          <div className="line"></div>
          <div className="password error"></div>
          <button className="button" onClick={handleClick}>
            Se connecter
          </button>
          <div className="error">{error}</div>
        </div>
      </form>
    </div>
  );
}
