import React from 'react';
import "./StyleSiswa.css"
import logo from "../assets/logo1.png";

const Soal = () => {
  const email = localStorage.getItem("email");
  const profileImage = email ? `https://www.gravatar.com/avatar/${email}` : null;

  return (
    <div className="App">
        <div className="form-container-siswa">
            <div className="header">
                <img src={logo} alt="Logo" className="logo-image" />
                <img src={profileImage} alt="Profile" className="profile-image" />
            </div>
            <div className="divider"></div>
            <div className="formsiswa">
            <h2>Soal No. 1</h2>
                <div className="soal-container">
                    <div className="soal">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur dolor, in recusandae placeat veniam, quas animi molestiae veritatis sequi harum, magnam ipsa libero possimus suscipit ab sapiente. Odio, amet delectus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quo quod, rerum quidem, praesentium est accusantium, doloremque quibusdam harum animi facere cupiditate esse? Ab animi quia quo temporibus delectus facere?Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sint, numquam illo fuga sunt libero recusandae debitis est culpa laudantium hic voluptates odio ipsum nobis asperiores deleniti minus pariatur! Officiis.</p>
                    </div>
                    <div className="jawaban">
                        <button className="submit-jawaban">A. Pilihan 1</button>
                        <button className="submit-jawaban">B. Pilihan 2</button>
                        <button className="submit-jawaban">C. Pilihan 3</button>
                        <button className="submit-jawaban">D. Pilihan 4</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Soal;