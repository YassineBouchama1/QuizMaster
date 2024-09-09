const db = require('../config/database');

// add a new quiz
const addQuiz = (title, description, teacher_id, viewAnswers, seeResult, successScore, status, callback) => {
  const sql = 'INSERT INTO quizzes (title, description, teacher_id, viewAnswers, seeResult, successScore, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [title, description, teacher_id, viewAnswers, seeResult, successScore, status], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};


// Get all quizzes
const getAllQuizzes = (callback) => {
  const sql = 'SELECT * FROM quizzes';
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Get a quiz by ID
const getQuizById = (id, callback) => {
  const sql = 'SELECT * FROM quizzes WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Optionally: Update a quiz by ID
const updateQuizById = (id, title, description, teacher_id, viewAnswers, seeResult, successScore, status, callback) => {
  const sql = `
    UPDATE quizzes 
    SET title = ?, description = ?, teacher_id = ?, viewAnswers = ?, seeResult = ?, successScore = ?, status = ? 
    WHERE id = ?
  `;
  db.query(sql, [title, description, teacher_id, viewAnswers, seeResult, successScore, status, id], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Optionally: Delete a quiz by ID
const deleteQuizById = (id, callback) => {
  const sql = 'DELETE FROM quizzes WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  addQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuizById,
  deleteQuizById
};
