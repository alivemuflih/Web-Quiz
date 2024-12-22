const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db'); // Konfigurasi database
const router = express.Router();

// Endpoint untuk registrasi pengguna
router.post('/register', (req, res) => {
  const { username, email, password, gurusiswa } = req.body;
  console.log("Data diterima:", { username, email, password, gurusiswa });

  // Validasi input
  if (!username || !email || !password || !gurusiswa) {
    console.log("Validasi gagal: Ada field yang kosong");
    return res.status(400).send('Semua field harus diisi!');
  }

  if (!['guru', 'siswa'].includes(gurusiswa.toLowerCase())) {
    console.log("Validasi gagal: Role tidak valid");
    return res.status(400).send('Role harus "guru" atau "siswa".');
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.log("Kesalahan bcrypt:", err);
      return res.status(500).send('Terjadi kesalahan saat mengenkripsi password.');
    }

    const query = 'INSERT INTO users (username, email, password, gurusiswa) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, hashedPassword, gurusiswa], (err) => {
      if (err) {
        console.log("Kesalahan query database:", err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).send('Email sudah terdaftar.');
        }
        return res.status(500).send('Terjadi kesalahan saat menyimpan data pengguna.');
      }
      res.status(200).send({ message: 'Pendaftaran berhasil!' });
    });
  });
});

// Endpoint untuk login pengguna
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username dan password harus diisi!');
  }

  // Query untuk mencari pengguna berdasarkan username
  db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.log("Kesalahan query database:", err);
      return res.status(500).send('Terjadi kesalahan saat mengambil data pengguna.');
    }

    if (results.length === 0) {
      return res.status(404).send('Pengguna tidak ditemukan.');
    }

    const user = results[0];

    // Verifikasi password dengan bcrypt
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.log("Kesalahan bcrypt:", err);
        return res.status(500).send('Terjadi kesalahan saat memverifikasi password.');
      }

      if (!isMatch) {
        return res.status(401).send('Password salah.');
      }

      // Kirim response login berhasil dengan informasi role
      res.status(200).json({
        message: 'Login berhasil!',
        role: user.gurusiswa, // Kirimkan role pengguna
      });
    });
  });
});

module.exports = router;
