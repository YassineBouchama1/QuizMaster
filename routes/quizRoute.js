const express = require('express');

const { protect, allowedTo } = require('../middlewares/guard');
const { createQuiz, quizForm, getQuizById, getAllQuizForTeacher, deleteQuiz, updateQuiz, quizBelongStudent, assignAttempToStudent } = require('../controllers/quizController');
const uploadMiddleware = require('../middlewares/uploadMiddleware');


const router = express.Router();



router.route("/") // this route for return list belong teachr
  .get(protect, allowedTo('teacher'), getAllQuizForTeacher)

// this is for bring quiz for students
router.route("/student")
  .get(protect, allowedTo('student'), quizBelongStudent)


router.route('/attemp/:id')
  .post(protect, allowedTo('student'), assignAttempToStudent) //alowed only for student when pass quiz



router.route('/create')
  .get(quizForm)
  .post(protect, allowedTo('teacher'), uploadMiddleware.uploadQuestionImages, createQuiz) //alowed only for teahcer


router.route("/:id")
  .get(protect, allowedTo('teacher', 'student'), getQuizById)
  .delete(protect, allowedTo('teacher'), deleteQuiz)
  .put(protect, allowedTo('teacher'), updateQuiz)


module.exports = router;

