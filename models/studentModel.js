const db = require('../config/database')




// get a student by ID
const getStudentById = (id, callback) => {
    const sql = 'SELECT * FROM students WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};



const students = (id) => {
    return new Promise((resolve, reject) => {

        const sql = `SELECT 
    s.id, 
    s.firstName, 
    s.lastName, 
    s.email, 
    s.status, 
    c.name AS className,
    t.firstName AS teacherFirstName,
    t.lastName AS teacherLastName
FROM 
    students s
JOIN 
    classes c ON s.class_id = c.id
JOIN 
    teachers t ON c.teacher_id = t.id
WHERE 
    t.id = ?;`


        db.query(sql, [id], (err, results) => {
            if (err) reject(err)
            else resolve(results)
        })

    })
}

module.exports = {
    getStudentById,
    students
}