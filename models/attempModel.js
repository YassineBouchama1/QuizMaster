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
  console.log('inside attemp', quizId, studentId); // debugging the quizId and studentId
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * 
      FROM attempts 
      WHERE quiz_id = ? 
        AND student_id = ? 
        AND status = 'active'
    `;


    db.query(sql, [quizId, studentId], (err, results) => {
      if (err) {
        console.error('SQL Error:', err.message);
        return reject(err);
      }
      resolve(results);
    });
  });
};




// Helper function to find the first active attempt for a student and quiz
const findFirstActiveAttempt = (studentId, quizId) => {
  const sql = `
      SELECT id FROM attempts 
      WHERE student_id = ? AND quiz_id = ? AND status = 'active'
      ORDER BY created_at ASC LIMIT 1
  `;
  return new Promise((resolve, reject) => {
    db.query(sql, [studentId, quizId], (err, results) => {
      if (err) return reject(new Error(`Error finding active attempt: ${err.message}`));
      resolve(results.length > 0 ? results[0].id : null);
    });
  });
};



// Helper function to update the status of an attempt
const updateAttemptStatus = (attemptId, newStatus) => {
  const sql = 'UPDATE attempts SET status = ? WHERE id = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [newStatus, attemptId], (err, result) => {
      if (err) return reject(new Error(`Error updating attempt status: ${err.message}`));
      resolve(result.affectedRows);
    });
  });
};



module.exports = {
  insertAttemp, findStudentAttempBelongQuiz,
  updateAttemptStatus, findFirstActiveAttempt
};


