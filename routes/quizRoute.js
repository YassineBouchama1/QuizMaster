const express = require('express');

const { createQuiz, quizForm, getQuizById, getAllQuizForTeacher, deleteQuiz } = require('../controllers/quizController');
const { protect, allowedTo } = require('../middleWares/guard');

const router = express.Router();



router.route("/") // this route for return list belong teachr
  .get(protect, allowedTo('teacher'), getAllQuizForTeacher)

router.route("/:id")
  .get(getQuizById)
  .delete(protect, allowedTo('teacher'), deleteQuiz)

router.route('/create')
  .get(quizForm)
  .post(protect, allowedTo('teacher'), createQuiz) //alowed only for teahcer



module.exports = router;

