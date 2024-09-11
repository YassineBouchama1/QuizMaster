
const db = require('../config/database');
const attempModel = require('./attempModel')


// helper function to find request by ID
const findRequestById = (requestId) => {
    const sql = 'SELECT student_id, quiz_id FROM requests WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [requestId], (err, results) => {
            if (err) return reject(new Error(`Error finding request: ${err.message}`));
            resolve(results.length > 0 ? results[0] : null);
        });
    });
};


// hlper function to  create request for more attemp 
const insertRequest = (idstudent, idQuiz) => {

    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO requests (student_id, quiz_id) VALUES (?, ?)';
        db.query(sql, [idstudent, idQuiz], (err, results) => {
            if (err) {
                return reject(new Error(`Error inserting request: ${err.message}`));
            }
            resolve(results.insertId); // return the inserted quiz ID
        });
    });
}


// helper function to update request status
const updateRequestStatus = (requestId, status) => {
    const sql = 'UPDATE requests SET status = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(sql, [status, requestId], (err, result) => {
            if (err) return reject(new Error(`Error updating request: ${err.message}`));
            resolve(result.affectedRows);
        });
    });
};




// transactional function to update request and handle attempt deactivation
const updateRequestWithAttempt = (requestId, status) => {
    return new Promise((resolve, reject) => {

        // Start the transaction
        db.beginTransaction(async err => {
            if (err) {
                console.error('Error starting transaction:', err.message);
                return reject(err);
            }

            try {
                // Update the request status
                const requestUpdated = await updateRequestStatus(requestId, status);

                // If the request status is accepted, handle attempt deactivation
                if (status === 'accept') {
                    const request = await findRequestById(requestId);

                    if (request) {
                        const { student_id, quiz_id } = request;
                        const attemptId = await attempModel.findFirstActiveAttempt(student_id, quiz_id);

                        if (attemptId) {
                            await attempModel.updateAttemptStatus( attemptId, 'deactivate');
                        }
                    }
                }

                // Commit the transaction
                db.commit(err => {
                    if (err) {
                        console.error('Error committing transaction:', err.message);
                        return db.rollback(() => {

                            reject(err);
                        });
                    }

                    resolve({ success: true, affectedRows: requestUpdated });
                });
            } catch (error) {
                console.error('Error during transaction:', error.message);
                // Rollback the transaction if any operation fails
                db.rollback(() => {

                    reject(error);
                });
            }
        });
    });

};



module.exports = {
    findRequestById,
    insertRequest,
    updateRequestStatus,
    updateRequestWithAttempt
}