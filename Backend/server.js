require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/users');
const teacherRoutes = require('./routes/teacher');
const coursesRoutes = require('./routes/courses-admin');
const addQuestionRoutes = require('./routes/add-question-admin');
const mysql = require('mysql2');
const db = require('../Backend/config/db');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', teacherRoutes);
app.use('/api', coursesRoutes);
app.use('/api', addQuestionRoutes);

// Endpoint untuk mengambil semua kursus
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await db.query("SELECT * FROM courses");
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/api/courses/:courseId/questions', (req, res) => {
  const courseId = isNaN(req.params.courseId)
    ? req.params.courseId // Menggunakan courseName jika bukan angka
    : parseInt(req.params.courseId, 10); // Menggunakan courseId jika angka

  const query = `
    SELECT 
      questions.id AS question_id, 
      questions.question_text, 
      questions.marks, 
      questions.correct_option,
      options.id AS option_id, 
      options.option_text
    FROM questions
    JOIN options ON questions.id = options.question_id
    WHERE questions.course_id = ?
  `;

  db.query(query, [courseId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to fetch questions' });
    }

    const groupedQuestions = results.reduce((acc, row) => {
      const { question_id, question_text, marks, correct_option, option_text } = row;
      if (!acc[question_id]) {
        acc[question_id] = {
          question_id,
          question_text,
          marks,
          correct_option,
          options: [],
        };
      }
      acc[question_id].options.push({ option_text, option_id: row.option_id });
      return acc;
    }, {});

    res.json(Object.values(groupedQuestions));
  });
});


// Error handling middleware (harus di akhir)
app.use((err, req, res, next) => {
  console.error(err.stack); // Menampilkan error di console
  res.status(500).json({
    message: 'Terjadi kesalahan internal server.',
    error: err.message // Bisa juga menampilkan detail error jika diperlukan
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
