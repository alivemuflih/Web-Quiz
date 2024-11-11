// src/Login.js
import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import logo from "../assets/logo1.png";
import "./StyleLogin.css";

function Login() {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <div className="App">
      <div className="form-container">
        <div className="header">
          <img src={logo} alt="Logo" className="logo-image" />
          <button className="toggle-button" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Masuk" : "Daftar"}
          </button>
        </div>
        {isRegister ? <RegisterForm /> : <LoginForm />}
      </div>
    </div>
  );
}

export default Login;