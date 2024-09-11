const db = require('../config/database');


// insert an answer into the answers table
const insertAnswer = (questionId, answerText) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO answers (text, question_id) VALUES (?, ?)';
        db.query(sql, [answerText, questionId], (err, results) => {
            if (err) {
                return reject(new Error(`Error inserting answer: ${err.message}`));
            }
            resolve(results); // return the resukt
        });
    });
};

// hlper function to find the first active attempt
const findFirstActiveAttempt = (studentId, quizId) => {
    return new Promise((resolve, reject) => {
        const sqlFindAttempt = `
            SELECT id FROM attempts 
            WHERE student_id = ? AND quiz_id = ? AND status = 'active'
            ORDER BY created_at ASC LIMIT 1
        `;
        db.query(sqlFindAttempt, [studentId, quizId], (err, attempts) => {
            if (err) {
                return reject(new Error(`Error finding attempt: ${err.message}`));
            }

            if (attempts.length > 0) {
                resolve(attempts[0].id); // return the attempt ID
            } else {
                resolve(null); // No active attempts found
            }
        });
    });
};


module.exports = {
    insertAnswer
}