const db = require('../config/database')




// get a student by ID
const getStudentById = (id, callback) => {
    const sql = 'SELECT * FROM students WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};







const assignQuizToStudents = (idQuiz, idStudents) => {
    // remove duplicate student IDs
    const uniqueStudentIds = [...new Set(idStudents)];

    return new Promise((resolve, reject) => {

        db.beginTransaction(async err => {

            if (err) {
                console.error('Error starting transaction:', err.message);
                return reject(err);
            }

            try {

                // assign quiz to eqch student

                const assignPromises = uniqueStudentIds.map(async ({ id }) => await assignQuizToStudent(idQuiz, id));

                // wait for all quiz assigned to student
                await Promise.all(assignPromises);


                // commit the transaction if successful
                db.commit(err => {
                    if (err) {
                        console.error('Error committing transaction:', err.message);
                        return db.rollback(() => callback(err));
                    }
                    resolve({ success: true, message: 'Quiz and questions added successfully' });
                });
            } catch (error) {
                console.error('Error during quiz creation:', error.message);
                // rollback if any operation fails
                db.rollback(() => reject(error));

            }

        })

    })

}




// for create assign quiz student 
const assignQuizToStudent = (idQuiz, idstudent) => {

    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO quizperstudent (student_id, quiz_id) VALUES (?, ?)';
        db.query(sql, [idstudent, idQuiz], (err, results) => {
            if (err) {
                return reject(new Error(`Error assign quiz to student: ${err.message}`));
            }
            resolve(results.insertId); // return the inserted quiz ID
        });
    });
}




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
    students,
    assignQuizToStudent,
    assignQuizToStudents
}