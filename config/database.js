const mysql = require('mysql2');
const { Tables } = require('./initialTables');

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

    // unitialize tables after connecting to db
    Tables.forEach((table, i) => {
        connection.query(table, (err) => {
            if (err) throw err;
            console.log(`${i}=table created or already exists`);
        });
    })




});

module.exports = connection;
