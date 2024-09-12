const express = require('express');
const {
  dashboardTeacher,
  getTeacher,
} = require('../controllers/teacherController');
const { protect, allowedTo } = require('../middlewares/guard');

const router = express.Router();

router.route('/')
  .get(protect,allowedTo('teacher'), dashboardTeacher)


router.route('/me')
  .get(protect,allowedTo('teacher'), getTeacher)

module.exports = router;

