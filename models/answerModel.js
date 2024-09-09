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


module.exports = {
    insertAnswer
}