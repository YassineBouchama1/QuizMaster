const db = require('../config/database');

// create the teachers table if it doesn't exist
const createTeacherTable = () => {

  console.log('hello world')
  const sql = `
    CREATE TABLE IF NOT EXISTS teachers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  db.query(sql, (err) => {
    if (err) throw err;
    console.log('Teachers table created or already exists');
  });
};

// add a new teacher
const addTeacher = (firstName, lastName, email, password, callback) => {
  const sql = 'INSERT INTO teachers (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
  db.query(sql, [firstName, lastName, email, password], (err, results) => {
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
