
const db = require('../config/database');


// helper function to find request by ID
const findRequestById = (requestId) => {
    const sql = 'SELECT student_id, quiz_id FROM requests WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [requestId], (err, results) => {
            if (err) return reject(new Error(`Error finding request: ${err.message}`));
            resolve(results.length > 0 ? results[0] : null);
        });
    });
};


// hlper function to  create request for more attemp 
const insertRequest = (idstudent, idQuiz) => {

    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO requests (student_id, quiz_id) VALUES (?, ?)';
        db.query(sql, [idstudent, idQuiz], (err, results) => {
            if (err) {
                return reject(new Error(`Error inserting request: ${err.message}`));
            }
            resolve(results.insertId); // return the inserted quiz ID
        });
    });
}


// helper function to update request status
const updateRequestStatus = (requestId, status) => {
    const sql = 'UPDATE requests SET status = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [status, requestId], (err, result) => {
            if (err) return reject(new Error(`Error updating request: ${err.message}`));
            resolve(result.affectedRows);
        });
    });
};


module.exports = {
    findRequestById,
    insertRequest,
    updateRequestStatus
}