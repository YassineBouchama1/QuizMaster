const db = require('../config/database');


// add a new teacher
const inserClass = (name, teacherId) => {
    console.log(name, teacherId)
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO classes (name, teacher_id) VALUES (?, ?)';
        db.query(sql, [name, teacherId], (err, results) => {
            if (err) {
                return reject(new Error(`Error inserting class: ${err.message}`));
            }
            resolve(results.insertId);
        });
    })
};







// assign  student to spicifyc class :  studentIds = [1.6.8...]
const assignStudentsToClass = (classId, studentIds) => {
    return new Promise((resolve, reject) => {


        // remove duplicate student IDs
        const uniqueStudentIds = [...new Set(studentIds)];
      
        const sql = 'UPDATE students SET class_id = ? WHERE id IN (?)';

        db.query(sql, [classId, uniqueStudentIds], (err, results) => {
            if (err) {
                console.error('Error updating students:', err.message);
                return reject(new Error(`Update error: ${err.message}`));
            }

            //check if assigned 
            if (results.affectedRows === 0) {
                console.warn('No students were updated.');
            }


            resolve(results);
        });
    });
};





// get all teachers
const getAllTeachers = (callback) => {
    const sql = 'SELECT * FROM classes';
    db.query(sql, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// get a teacher by ID
const getTeacherById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM classes WHERE teacher_id = ?';
        db.query(sql, [id], (err, results) => {
            // if (err) reject(err)
            if (err) resolve(null)
            else resolve(results[0])
        });
    })
};



module.exports = {
    assignStudentsToClass,
    inserClass,
    getAllTeachers,
    getTeacherById,

};
