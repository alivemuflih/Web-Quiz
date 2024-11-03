import React from "react";

function RegisterForm() {
  return (
    <div className="form">
      <input type="text" placeholder="Username" className="input-field" />
      <input type="email" placeholder="Email" className="input-field" />
      <input type="password" placeholder="Password" className="input-field" />
      <input type="text" placeholder="Guru/Siswa" className="input-field" />
      <hr className="divider" />
      <button className="submit-button">Daftar</button>
    </div>
  );
}

export default RegisterForm;
