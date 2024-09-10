const db = require('../config/database');

// insert attemp
const insertAttemp = (score, win, student_id, quiz_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO attempts (score, win, student_id, quiz_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [score, win, student_id, quiz_id], (err, results) => {
      if (err) {
        return reject(new Error(`Error inserting quiz: ${err.message}`));
      }
      resolve(results.insertId); // return the inserted quiz ID
    });
  });
};

const findStudentAttempBelongQuiz = (quizId, studentId) => {
  console.log('inside attemp', quizId, studentId); // Log the quizId and studentId
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * 
      FROM attempts 
      WHERE quiz_id = ? 
        AND student_id = ? 
        AND status = 'active'
    `;

    console.log('SQL Query:', sql); // Log the SQL query

    db.query(sql, [quizId, studentId], (err, results) => {
      if (err) {
        console.error('SQL Error:', err.message); // Log SQL errors
        return reject(err);
      }
      resolve(results);
    });
  });
};


module.exports = {
  insertAttemp, findStudentAttempBelongQuiz
};


