const db = require('../config/database')


// insert an Subject into the subjects table

const Subject = {
    create: (name, subSubjectId = null) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO subjects (name, subSubject_id) VALUES (?,?)`;
            db.query(query, [name, subSubjectId], (err, result) => {
                if(err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    },

    createSubSubject: (name, subSubject_id) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO subjects (name, subSubject_id) VALUES (?,?)';
            db.query(query, [name, subSubject_id], (err, result) => {
                if(err) {
                    return reject(err);
                }
                resolve(result);
            })
        })
    },


    getAllSubject: () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM subjects WHERE subSubject_id IS NULL';
            db.query(sql, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    getSubjectById: (id) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM subjects WHERE id = ?';
            // The error was here: 'db:query' should be 'db.query'
            db.query(sql, [id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result[0]);
            });
        });
    },


    getSubSubjects: (subjectId) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM subjects WHERE subSubject_id = ?';
            db.query(sql, [subjectId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }


};




module.exports = Subject;