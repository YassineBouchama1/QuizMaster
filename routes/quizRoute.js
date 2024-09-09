const express = require('express');

const { protect } = require('../middleWares/guard');
const { createQuiz, quizForm } = require('../controllers/quizController');

const router = express.Router();


router.route('/create')
  .get(quizForm)
  .post(protect, createQuiz)



module.exports = router;

