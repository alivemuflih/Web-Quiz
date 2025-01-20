CREATE DATABASE quizApp;

USE quizApp;

-- Tabel untuk pengguna
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    gurusiswa ENUM('guru', 'siswa') NOT NULL,
    status ENUM('pending', 'approved') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SELECT * FROM users;

CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  courseName VARCHAR(255) NOT NULL,
  totalQuestions INT NOT NULL,
  totalMarks INT NOT NULL
);

select * from courses;

CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,  -- ID kursus yang terkait dengan soal
  question_text TEXT NOT NULL,  -- Teks pertanyaan
  marks INT NOT NULL,  -- Nilai soal
  correct_option VARCHAR(255) NOT NULL,  -- Opsi yang benar
  FOREIGN KEY (course_id) REFERENCES courses(id)  -- Relasi dengan tabel courses
);

SELECT * FROM questions;

CREATE TABLE options (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id INT NOT NULL,  -- ID soal yang terkait dengan opsi
  option_text VARCHAR(255) NOT NULL,  -- Teks opsi jawaban
  FOREIGN KEY (question_id) REFERENCES questions(id)  -- Relasi dengan tabel questions
);

SELECT * FROM options;

SHOW CREATE TABLE options;
ALTER TABLE questions;

ALTER TABLE questions
MODIFY correct_option VARCHAR(255);

ALTER TABLE options
DROP FOREIGN KEY options_ibfk_1;

ALTER TABLE options
ADD CONSTRAINT fk_question_id
FOREIGN KEY (question_id)
REFERENCES questions(id)
ON DELETE CASCADE;
DESCRIBE questions;




