const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Route untuk menambahkan kursus
router.post('/courses', (req, res) => {
    const { courseName, totalQuestions, totalMarks } = req.body;

    // Query untuk menyimpan kursus baru ke database
    db.query(
      'INSERT INTO courses (courseName, totalQuestions, totalMarks) VALUES (?, ?, ?)',
      [courseName, totalQuestions, totalMarks],
      (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Database query error' });
        }
        res.status(201).json({
          id: results.insertId,  // ID dari kursus yang baru dimasukkan
          courseName,
          totalQuestions,
          totalMarks,
        });
      }
    );
});

// Route untuk mengambil semua kursus
router.get('/courses', (req, res) => {
  db.query('SELECT * FROM courses', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

// Route untuk menghapus kursus berdasarkan ID
router.delete('/courses/:id', (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  db.query('DELETE FROM courses WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  });
});

// Route untuk mengambil kursus berdasarkan courseName
router.get('/courses/:courseName', (req, res) => {
  const { courseName } = req.params;

  // Query untuk mengambil data kursus berdasarkan courseName
  db.query('SELECT * FROM courses WHERE courseName = ?', [courseName], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Terjadi kesalahan pada query database' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Kursus tidak ditemukan' });
    }

    res.json(results[0]); // Mengirimkan data kursus pertama yang ditemukan
  });
});


module.exports = router;
