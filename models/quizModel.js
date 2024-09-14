const db = require('../config/database');
const questionModel = require('./questionModel')
const answerModel = require('./answerModel')


// add a new quiz along with its questions and answers in a single transaction
const addQuizWithQuestions = (title, description, teacher_id, attempLimit, viewAnswers, seeResult, successScore, status, questions, callback) => {
  console.log(questions.answers)

  db.beginTransaction(async err => {
    if (err) {
      console.error('Error starting transaction:', err.message);
      return callback(err);
    }

    try {
      // insert the quiz
      const quizId = await insertQuiz(title, description, teacher_id, attempLimit, viewAnswers, seeResult, successScore, status);

      // insert questions and their answers
      const questionPromises = questions.map(async ({ text, numberOfPoints, answers, imagePath }) => {
        const questionId = await questionModel.insertQuestion(quizId, text, numberOfPoints, imagePath);
        await answers.map(({ text, isCorrect }) => answerModel.insertAnswer(questionId, text, isCorrect))

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
const insertQuiz = (title, description, teacher_id, attempLimit, viewAnswers, seeResult, successScore, status) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO quizzes (title, description, teacher_id, attempLimit,viewAnswers, seeResult, successScore, status) VALUES (?, ?, ?,?, ?, ?, ?, ?)';
    db.query(sql, [title, description, teacher_id, attempLimit, viewAnswers, seeResult, successScore, status], (err, results) => {
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
      q.attempLimit,
        q.status AS quizStatus,
        qs.id AS questionId, 
        qs.text AS questionText, 
        qs.numberOfPoints,
        qs.image,  
        an.id AS answerId, 
        an.text AS answerText,  
        an.isCorrect AS isCorrect
      FROM quizzes q
      LEFT JOIN questions qs ON q.id = qs.quiz_id
      LEFT JOIN answers an ON qs.id = an.question_id
      WHERE q.id = ?
    `;

    db.query(sql, [quizId], (err, results) => {
      if (err) return reject(err);
      if (results?.length === 0) resolve(null);
      // Organize results into a structured format
      const quiz = {
        id: results[0]?.quizId,
        title: results[0]?.quizTitle,
        description: results[0]?.quizDescription,
        attempLimit: results[0]?.attempLimit,
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
              image: row.image,
              answers: []
            };
          }
          if (row.answerId) {
            questions[row.questionId].answers.push({
              id: row.answerId,
              text: row.answerText,
              isCorrect: row.isCorrect
            });
          }
        }
      });

      quiz.questions = Object.values(questions);

      resolve(quiz);
    });
  });
};

// Get all quizzes belonging to a teacher, including an image from a question linked to the quiz (where the image is not NULL)
const getAllQuizzesBelongTeacher = (idTeacher) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        qz.id AS quiz_id, 
        qz.title, 
        qz.description, 
        qz.attempLimit, 
        qz.viewAnswers, 
        qz.seeResult, 
        qz.successScore, 
        qz.status, 
        qz.created_at,
        q.text AS question_text,
        q.image AS question_image
      FROM quizzes qz
      LEFT JOIN questions q ON q.quiz_id = qz.id AND q.image IS NOT NULL
      WHERE qz.teacher_id = ?
    `;

    db.query(sql, [idTeacher], (err, results) => {
      if (err) return reject(err);
      else resolve(results);
    });
  });
};





// Get all quizzes belong student
const getAllQuizzesBelongStudent = (idStudent) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM quizperstudent WHERE student_id = ?;`;
    db.query(sql, [idStudent], (err, results) => {
      if (err) return reject(err);
      else resolve(results)
    });
  })
};




// Optionally: Update a quiz by ID
const updateQuizById = (id, updateData) => {
  // Construct the dynamic update query
  let sql = 'UPDATE quizzes SET ';
  const fields = [];
  const values = [];

  // set only field that comes from frontend
  Object.keys(updateData).forEach((key) => {
    fields.push(`${key} = ?`);
    values.push(updateData[key]);
  });

  sql += fields.join(', ') + ' WHERE id = ?';
  values.push(id);

  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};


const findQuizById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM quizzes WHERE id = ?';

    db.query(sql, [id], (err, results) => {
      if (err) return reject(err);

      if (results.length === 0) {
        // nuiz found with the given ID
        return resolve(null);
      }

      resolve(results[0]); // return found quiz
    });
  });
};



// Optionally: Delete a quiz by ID
const deleteQuizById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM quizzes WHERE id = ?';
    db.query(sql, [id], (err, results) => {
      if (err) return reject(err);
      else resolve(results)
    });
  })
};

module.exports = {
  getQuizWithAssociationsByQuizId,
  addQuizWithQuestions,
  getAllQuizzesBelongTeacher,
  updateQuizById,
  deleteQuizById,
  findQuizById,
  getAllQuizzesBelongStudent
};
