const db = require('../config/database');

// create the teachers table if it doesnt exist
const createTeacherTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS teachers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  db.query(sql, (err) => {
    if (err) throw err;
    console.log('Teachers table created or already exists');
  });
};




// add a new teacher
const addTeacher = (name, email, callback) => {
  const sql = 'INSERT INTO teachers (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

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


module.exports = {
  createTeacherTable,
  addTeacher,
  getAllTeachers,
  getTeacherById,

};
