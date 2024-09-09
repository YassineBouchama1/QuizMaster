const db = require('../config/database');

// add a new quiz
const addQuestion = (quiz_id, text, numberOfPoints, callback) => {
    const sql = 'INSERT INTO questions (quiz_id, text, numberOfPoints) VALUES (?, ?, ?)';
    db.query(sql, [quiz_id, text, numberOfPoints], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};




module.exports = {
    addQuestion
}