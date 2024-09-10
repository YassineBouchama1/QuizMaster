const express = require('express');

const { createQuiz, quizForm, getQuizById, getAllQuizForTeacher, deleteQuiz, updateQuiz, quizBelongStudent } = require('../controllers/quizController');
const { protect, allowedTo } = require('../middleWares/guard');

const router = express.Router();



router.route("/") // this route for return list belong teachr
  .get(protect, allowedTo('teacher'), getAllQuizForTeacher)

// this is for bring quiz for students
router.route("/student")
  .get(protect, allowedTo('student'), quizBelongStudent)





router.route('/create')
  .get(quizForm)
  .post(protect, allowedTo('teacher'), createQuiz) //alowed only for teahcer

router.route("/:id")
  .get(getQuizById)
  .delete(protect, allowedTo('teacher'), deleteQuiz)
  .put(protect, allowedTo('teacher'), updateQuiz)


module.exports = router;

