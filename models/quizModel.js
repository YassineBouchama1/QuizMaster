const db = require('../config/database');
const questionModel = require('./questionModel')
const answerModel = require('./answerModel')


// add a new quiz along with its questions and answers in a single transaction
const addQuizWithQuestions = (title, description, teacher_id, viewAnswers, seeResult, successScore, status, questions, callback) => {
  console.log(questions)
  db.beginTransaction(async err => {
    if (err) {
      console.error('Error starting transaction:', err.message);
      return callback(err);
    }

    try {
      // insert the quiz
      const quizId = await insertQuiz(title, description, teacher_id, viewAnswers, seeResult, successScore, status);

      // insert questions and their answers
      const questionPromises = questions.map(async ({ text, numberOfPoints, answerText }) => {
        const questionId = await questionModel.insertQuestion(quizId, text, numberOfPoints);
        await answerModel.insertAnswer(questionId, answerText);
      });

      // wait for all questions and answers to be inserted
      await Promise.all(questionPromises);

      // commit the transaction if successful
      db.commit(err => {
        if (err) {
          console.error('Error committing transaction:', err.message);
          return db.rollback(() => callback(err));
        }
        callback(null, { success: true, message: 'Quiz and questions added successfully' });
      });
    } catch (error) {
      console.error('Error during quiz creation:', error.message);
      // rollback if any operation fails
      db.rollback(() => callback(error));
    }
  });
};

// insert quiexz
const insertQuiz = (title, description, teacher_id, viewAnswers, seeResult, successScore, status) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO quizzes (title, description, teacher_id, viewAnswers, seeResult, successScore, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [title, description, teacher_id, viewAnswers, seeResult, successScore, status], (err, results) => {
      if (err) {
        return reject(new Error(`Error inserting quiz: ${err.message}`));
      }
      resolve(results.insertId); // return the inserted quiz ID
    });
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
  addQuizWithQuestions,
  getAllQuizzes,
  getQuizById,
  updateQuizById,
  deleteQuizById
};
