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


    getAllSubject: () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM subjects';
            db.query(sql, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
};


module.exports = Subject;