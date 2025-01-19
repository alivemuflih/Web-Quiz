const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Endpoint untuk menambahkan soal baru
router.post('/courses/:courseId/questions', async (req, res) => {
  try {
    const { courseId } = req.params; // Mengambil courseId dari URL
    const { questionText, marks, correctOption, options } = req.body;

    if (!courseId || !questionText || !marks || !correctOption || !options || options.length === 0) {
      return res.status(400).json({ message: 'Semua field harus diisi dan opsi tidak boleh kosong.' });
    }

    // Validasi marks untuk memastikan itu adalah angka
    if (isNaN(marks) || marks <= 0) {
      return res.status(400).json({ message: 'Marks harus berupa angka positif.' });
    }

    // Pastikan correctOption ada di dalam opsi yang diberikan
    if (!options.includes(correctOption)) {
      return res.status(400).json({ message: 'Correct option must be one of the provided options.' });
    }

    // Insert pertanyaan ke dalam tabel questions
    const [result] = await db.promise().query(
      'INSERT INTO questions (course_id, question_text, marks, correct_option) VALUES (?, ?, ?, ?)',
      [courseId, questionText, marks, correctOption]
    );

    const questionId = result.insertId;

    // Insert opsi ke dalam tabel options
    const optionsQueries = options.map(option =>
      db.promise().query(
        'INSERT INTO options (question_id, option_text) VALUES (?, ?)',
        [questionId, option]
      )
    );

    await Promise.all(optionsQueries);

    res.status(201).json({ message: 'Pertanyaan berhasil ditambahkan.', questionId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan soal.' });
  }
});

// Endpoint untuk menghapus course
router.delete('/courses/:courseId', async (req, res) => {
    const { courseId } = req.params;
  
    try {
      // Hapus soal-soal yang terkait dengan course
      await db.promise().query('DELETE FROM questions WHERE course_id = ?', [courseId]);
  
      // Hapus course itu sendiri
      const [result] = await db.promise().query('DELETE FROM courses WHERE id = ?', [courseId]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Course tidak ditemukan.' });
      }
  
      res.status(200).json({ message: 'Course berhasil dihapus.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat menghapus course.' });
    }
  });

  router.get('/courses/:courseId', (req, res) => {
    const courseId = req.params.courseId;
  
    // Query to fetch course details along with its questions and options
    const query = `
      SELECT 
        courses.*, 
        questions.id AS questionId, 
        questions.question_text, 
        questions.marks, 
        questions.correct_option,
        options.id AS optionId, 
        options.option_text
      FROM courses
      LEFT JOIN questions ON courses.id = questions.course_id
      LEFT JOIN options ON questions.id = options.question_id
      WHERE courses.id = ?;
    `;
  
    db.query(query, [courseId], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Failed to fetch course and its questions.' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ error: 'Course not found.' });
      }
  
      // Mengelompokkan hasil berdasarkan questionId
      const groupedQuestions = results.reduce((acc, row) => {
        const { questionId, question_text, marks, correct_option, optionId, option_text } = row;
        if (!acc[questionId]) {
          acc[questionId] = {
            id: questionId,
            questionText: question_text,
            marks: marks,
            correctOption: correct_option,
            options: []
          };
        }
        if (optionId) {
          acc[questionId].options.push({
            id: optionId,
            optionText: option_text
          });
        }
        return acc;
      }, {});
  
      // Mengonversi object menjadi array
      const questions = Object.values(groupedQuestions);
      res.json({ courseId, questions });
    });
  });  
  
// Endpoint untuk mengambil soal dan opsi terkait
router.get('/courses/:courseId/questions', (req, res) => {
  const courseId = req.params.courseId;
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

    // Mengelompokkan hasil berdasarkan question_id
    const groupedQuestions = results.reduce((acc, row) => {
      const { question_id, question_text, marks, correct_option, option_id, option_text } = row;
      if (!acc[question_id]) {
        acc[question_id] = {
          question_id,
          question_text,
          marks,
          correct_option,
          options: []
        };
      }
      acc[question_id].options.push(option_text); // Menambahkan option_text sebagai string
      return acc;
    }, {});

    // Mengonversi object menjadi array
    const questions = Object.values(groupedQuestions);
    res.json(questions);
  });
});

// Misalnya di Express.js
router.get('/questions/:courseId', (req, res) => {
  const { courseId } = req.params;

  const query = `
    SELECT q.id AS questionId, q.question_text, q.marks, q.correct_option, 
           o.id AS optionId, o.option_text
    FROM questions q
    LEFT JOIN options o ON q.id = o.question_id
    WHERE q.course_id = ?
    ORDER BY q.id, o.id
  `;

  db.query(query, [courseId], (err, results) => {
    if (err) {
      console.error('Error fetching questions:', err);
      return res.status(500).json({ message: 'Failed to fetch questions.' });
    }

    const questions = [];
    results.forEach(row => {
      const existingQuestion = questions.find(q => q.id === row.questionId);
      if (existingQuestion) {
        existingQuestion.options.push({
          id: row.optionId,
          option_text: row.option_text,
        });
      } else {
        questions.push({
          id: row.questionId,
          question_text: row.question_text,
          marks: row.marks,
          correct_option: row.correct_option, // Menyimpan correct_option sebagai teks
          options: [{
            id: row.optionId,
            option_text: row.option_text,
          }],
        });
      }
    });

    // Cocokkan correct_option dengan option_id jika bukan 0
    const enrichedQuestions = questions.map(q => {
      if (q.correct_option === "0") {
        // Jika correct_option adalah "0", langsung set dengan "No correct option available"
        return {
          ...q,
          correct_option_text: 'No correct option available',
        };
      }

      // Jika correct_option bukan "0", lakukan pencocokan dengan ID opsi
      const correctOption = q.options.find(option => option.id === parseInt(q.correct_option)); // Parse the correct_option to an integer for comparison
      return {
        ...q,
        correct_option_text: correctOption ? correctOption.option_text : 'No correct option available',
      };
    });

    res.json(enrichedQuestions);
  });
});  

router.delete('/questions/:id', (req, res) => {
  const questionId = req.params.id;

  // Contoh logika penghapusan dengan database MySQL
  const query = 'DELETE FROM questions WHERE id = ?';

  db.query(query, [questionId], (err, result) => {
    if (err) {
      console.error('Error deleting question:', err);
      return res.status(500).json({ message: 'Failed to delete question.' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Question not found.' });
    }

    res.status(200).json({ message: 'Question deleted successfully.' });
  });
});

router.put('/questions/:id', async (req, res) => {
  const questionId = req.params.id; // ID soal dari URL
  const updatedQuestion = req.body; // Data soal yang diperbarui

  try {
    // Update data soal di tabel questions
    const [result] = await db.promise().query(
      'UPDATE questions SET question_text = ?, marks = ?, correct_option = ? WHERE id = ?',
      [updatedQuestion.question_text, updatedQuestion.marks, updatedQuestion.correct_option, questionId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Soal tidak ditemukan.' });
    }

    // Mengupdate opsi jika ada perubahan pada opsi
    if (updatedQuestion.options && updatedQuestion.options.length > 0) {
      const optionQueries = updatedQuestion.options.map(option =>
        db.promise().query(
          'UPDATE options SET option_text = ? WHERE id = ? AND question_id = ?',
          [option.option_text, option.id, questionId]
        )
      );
      await Promise.all(optionQueries);
    }

    res.status(200).json({ message: 'Soal berhasil diperbarui.' });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui soal.' });
  }
});

router.get('/courses/:courseId/questions', (req, res) => {
  const { courseId } = req.params;
  const query = `
    SELECT 
      questions.id AS questionId, 
      questions.question_text, 
      questions.marks, 
      questions.correct_option, 
      options.id AS optionId, 
      options.option_text 
    FROM questions
    LEFT JOIN options ON questions.id = options.question_id
    WHERE questions.course_id = ?`;

  db.query(query, [courseId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Gagal mengambil soal.' });
    }

    const groupedQuestions = results.reduce((acc, row) => {
      const { questionId, question_text, marks, correct_option, optionId, option_text } = row;
      if (!acc[questionId]) {
        acc[questionId] = {
          id: questionId,
          question_text,
          marks,
          correct_option,
          options: [],
        };
      }
      acc[questionId].options.push({ id: optionId, option_text });
      return acc;
    }, {});

    res.json(Object.values(groupedQuestions));
  });
});


// Backend Express.js
router.get('/questions', (req, res) => {
  const query = `
    SELECT 
      questions.id AS questionId, 
      questions.question_text, 
      questions.marks, 
      questions.correct_option,
      options.id AS optionId, 
      options.option_text 
    FROM questions
    LEFT JOIN options ON questions.id = options.question_id
  `;

  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Gagal mengambil soal.' });
    }

    const groupedQuestions = results.reduce((acc, row) => {
      const { questionId, question_text, marks, correct_option, optionId, option_text } = row;
      if (!acc[questionId]) {
        acc[questionId] = {
          id: questionId,
          question_text,
          marks,
          correct_option,
          options: [],
        };
      }
      acc[questionId].options.push({ id: optionId, option_text });
      return acc;
    }, {});

    res.json(Object.values(groupedQuestions));
  });
});


module.exports = router;