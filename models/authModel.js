const db = require('../config/database');


// add a new teacher
const addTeacher = (firstName, lastName, email, password, speciality, callback) => {
    const sql = 'INSERT INTO teachers (firstName, lastName,speciality, email, password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, speciality, email, password], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};


// add a new teacher
const addStudent = (firstName, lastName, email, password, callback) => {
    const sql = 'INSERT INTO students (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, email, password], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};



// this func two check if email already exist in one of  tables
const checkEmailExists = (email, callback) => {
    const sql = `
      SELECT 'students' AS table_name, id, password, role FROM students WHERE email = ?
      UNION
      SELECT 'teachers' AS table_name, id, password, role FROM teachers WHERE email = ?
    `;

    db.query(sql, [email, email], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};
module.exports = {
    checkEmailExists,
    addTeacher,
    addStudent,

};
