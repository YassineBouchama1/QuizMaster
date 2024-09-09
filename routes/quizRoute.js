const express = require('express');

const { protect } = require('../middlewares/guard');
const { createQuiz, quizForm, getQuizById } = require('../controllers/quizController');

const router = express.Router();

router.route(":id")
  .get(getQuizById)
router.route('/create')
  .get(quizForm)
  .post(protect, createQuiz)



module.exports = router;

