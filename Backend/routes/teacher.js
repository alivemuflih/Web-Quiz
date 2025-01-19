const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Mendapatkan daftar guru yang menunggu persetujuan
router.get('/pending-teachers', async (req, res) => {
  try {
    const [teachers] = await db.query(
      'SELECT id, username, email, password FROM users WHERE gurusiswa = "guru" AND status = "pending"'
    );
    res.status(200).json({ data: teachers });
  } catch (error) {
    console.error('Error fetching pending teachers:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data guru.', error: error.message });
  }
});

// Menyetujui guru
router.put('/teachers/:id/approve', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query(
      'UPDATE users SET status = "approved" WHERE id = ? AND gurusiswa = "guru"',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Guru tidak ditemukan atau sudah disetujui.' });
    }

    res.status(200).json({ message: 'Guru berhasil disetujui.' });
  } catch (error) {
    console.error('Error approving teacher:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menyetujui guru.', error: error.message });
  }
});

// Menolak guru
router.put('/teachers/:id/reject', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ? AND gurusiswa = "guru"', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Guru tidak ditemukan.' });
    }

    res.status(200).json({ message: 'Guru berhasil ditolak.' });
  } catch (error) {
    console.error('Error rejecting teacher:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menolak guru.', error: error.message });
  }
});

module.exports = router;
