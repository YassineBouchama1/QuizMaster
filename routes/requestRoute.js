const express = require('express');

const { protect, allowedTo } = require('../middlewares/guard');
const { createRequest, getRequests, updateRequestStatus, requestsTeacher } = require('../controllers/requestController');

const router = express.Router();



// apis
router.route('/')
  .get(protect, allowedTo('teacher'), getRequests)


router.route('/:quizId') // this is make stduent to create request 
  .post(protect, allowedTo('student'), createRequest)


router.route('/:quizId') // this is make stduent to create request 
  .put(protect, allowedTo('student', 'teacher'), updateRequestStatus)

module.exports = router;

