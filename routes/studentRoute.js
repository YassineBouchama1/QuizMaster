const express = require('express');
const { allQuiz, studentsBelongTeacher, assignQuizToStudentController } = require('../controllers/studentController');
const { protect, allowedTo } = require('../middlewares/guard');

const router = express.Router();

router.route('/')
    .get(allQuiz);



// this is for bring all students for teacher dashboard
router.route('/teacher')
    .get(protect, allowedTo('teacher'), studentsBelongTeacher);


router.route('/assignQuiz')
    .post(protect, allowedTo('teacher'), assignQuizToStudentController)



module.exports = router;
