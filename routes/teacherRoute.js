const express = require('express');
const {
  dashboardTeacher,
  getTeacher,
} = require('../controllers/teacherController');
const { protect, allowedTo } = require('../middlewares/guard');
const { requestsTeacher } = require('../controllers/requestController');
const { quizForm, createQuiz, editQuizForm } = require('../controllers/quizController');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, allowedTo('teacher'), dashboardTeacher)


router.route('/me')
  .get(protect, allowedTo('teacher'), getTeacher)


router.route('/requests')
  .get(protect, allowedTo('teacher'), requestsTeacher)



router.route('/quiz')
  .get(protect, allowedTo('teacher'), quizForm)
  .post(protect, allowedTo('teacher'), uploadMiddleware.uploadQuestionImages, createQuiz) //alowed only for teahcer

router.route('/editQuiz/:id')
  .get(protect, allowedTo('teacher'), editQuizForm)



module.exports = router;

