const db = require('../config/database')




// get a student by ID
const getStudentById = (id, callback) => {
    const sql = 'SELECT * FROM students WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};


module.exports = {
    getStudentById
}