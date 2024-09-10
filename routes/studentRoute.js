const express = require('express');
const { allQuiz, studentsBelongTeacher } = require('../controllers/studentController');
const { protect, allowedTo } = require('../middleWares/guard');

const router = express.Router();

router.route('/')
    .get(allQuiz);



// this is for bring all students for teacher dashboard
router.route('/teacher')
    .get(protect, allowedTo('teacher'), studentsBelongTeacher);

module.exports = router;
