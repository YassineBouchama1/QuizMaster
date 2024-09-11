const express = require('express');
const { allQuiz, studentsBelongTeacher, assignQuizToStudentController, createRequest, updateRequestStatus } = require('../controllers/studentController');
const { protect, allowedTo } = require('../middleWares/guard');

const router = express.Router();

router.route('/')
    .get(allQuiz);



// this is for bring all students for teacher dashboard
router.route('/teacher')
    .get(protect, allowedTo('teacher'), studentsBelongTeacher);


router.route('/assignQuiz')
    .post(protect, allowedTo('teacher'), assignQuizToStudentController)

router.route('/request') // this is make stduent to create request 
    .post(protect, allowedTo('student'), createRequest)


router.route('/request/:id') // this is make stduent to create request 
    .put(protect, allowedTo('student'), updateRequestStatus)

module.exports = router;
