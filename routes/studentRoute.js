const express = require('express');
const { studentDashboard, studentsBelongTeacher, assignQuizToStudentController } = require('../controllers/studentController');
const { protect, allowedTo } = require('../middlewares/guard');

const router = express.Router();

router.route('/')
    .get(protect, allowedTo('student'), studentDashboard);



// this is for bring all students for teacher dashboard
router.route('/teacher')
    .get(protect, allowedTo('teacher'), studentsBelongTeacher);


router.route('/assignQuiz')
    .post(protect, allowedTo('teacher'), assignQuizToStudentController)



module.exports = router;
