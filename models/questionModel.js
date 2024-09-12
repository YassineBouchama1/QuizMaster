const db = require('../config/database');

// Add a new question 
const insertQuestion = (quizId, text, numberOfPoints, imagePath) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO questions (quiz_id, text, numberOfPoints,image) VALUES (?, ?, ?, ?)';
        db.query(sql, [quizId, text, numberOfPoints, imagePath], (err, results) => {
            if (err) {
                return reject(new Error(`Error inserting question: ${err.message}`));
            }
            resolve(results.insertId); // return the inserted answr ID
        });
    });
};

module.exports = {
    insertQuestion
};
