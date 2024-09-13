const express = require('express');
const {
  dashboardTeacher,
  getTeacher,
} = require('../controllers/teacherController');
const { protect, allowedTo } = require('../middlewares/guard');
const { requestsTeacher } = require('../controllers/requestController');

const router = express.Router();

router.route('/')
  .get(protect, allowedTo('teacher'), dashboardTeacher)


router.route('/me')
  .get(protect, allowedTo('teacher'), getTeacher)


router.route('/requests')
  .get(protect, allowedTo('teacher'), requestsTeacher)



module.exports = router;

