const mysql = require('mysql2');
const teacherModel = require('../models/teacher');
require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');

    // initialize tables after conected db
    // teacherModel.createTeacherTable();
});

module.exports = connection;
