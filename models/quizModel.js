const db = require('../config/database');
const questionModel = require('./questionModel')
const answerModel = require('./answerModel')


// add a new quiz along with its questions and answers in a single transaction
const addQuizWithQuestions = (title, description, teacher_id, viewAnswers, seeResult, successScore, status, attempLimit, questions, callback) => {
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



// get  quiz with questions and their answers
const getQuizWithAssociationsByQuizId = (quizId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        q.id AS quizId,
        q.title AS quizTitle,
        q.description AS quizDescription,
        q.viewAnswers,
        q.seeResult,
        q.successScore,
        q.status AS quizStatus,
        qs.id AS questionId, 
        qs.text AS questionText, 
        qs.numberOfPoints,
        an.id AS answerId, 
        an.text AS answerText
      FROM quizzes q
      LEFT JOIN questions qs ON q.id = qs.quiz_id
      LEFT JOIN answers an ON qs.id = an.question_id
      WHERE q.id = ?
    `;

    db.query(sql, [quizId], (err, results) => {
      if (err) return reject(err);

      // Organize results into a structured format
      const quiz = {
        id: results[0]?.quizId,
        title: results[0]?.quizTitle,
        description: results[0]?.quizDescription,
        viewAnswers: results[0]?.viewAnswers,
        seeResult: results[0]?.seeResult,
        successScore: results[0]?.successScore,
        status: results[0]?.quizStatus,
        questions: []
      };

      const questions = {};

      results.forEach(row => {
        if (row.questionId) {
          if (!questions[row.questionId]) {
            questions[row.questionId] = {
              id: row.questionId,
              text: row.questionText,
              numberOfPoints: row.numberOfPoints,
              answers: []
            };
          }
          if (row.answerId) {
            questions[row.questionId].answers.push({
              id: row.answerId,
              text: row.answerText
            });
          }
        }
      });

      quiz.questions = Object.values(questions);

      resolve(quiz);
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
  getQuizWithAssociationsByQuizId,
  addQuizWithQuestions,
  getAllQuizzes,

  updateQuizById,
  deleteQuizById
};
