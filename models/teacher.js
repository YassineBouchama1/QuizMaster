const db = require('../config/database');


// get all teachers
const getAllTeachers = (callback) => {
  const sql = 'SELECT * FROM teachers';
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// get a teacher by ID
const getTeacherById = (id, callback) => {
  const sql = 'SELECT * FROM teachers WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

const getTeacherByEmail = (email, callback) => {
  // console.log('inside getTeacherByEmail')
  const sql = 'SELECT * FROM teachers WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) return callback(err);

    callback(null, results[0]);
  });
};


module.exports = {


  getAllTeachers,
  getTeacherById,
  getTeacherByEmail
};
