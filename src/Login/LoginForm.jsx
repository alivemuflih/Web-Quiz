import React from "react";

function LoginForm() {
  return (
    <div className="form">
      <input type="text" placeholder="Email / Username" className="input-field" />
      <input type="password" placeholder="Password" className="input-field" />
      <hr className="divider" />
      <button className="submit-button">Masuk</button>
    </div>
  );
}

export default LoginForm;

