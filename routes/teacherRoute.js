const express = require('express');
const { protect } = require('../middlewares/guard');

const {
  dashboardTeacher,
  getTeacher,
} = require('../controllers/teacherController');

const router = express.Router();

router.route('/')
  .get(dashboardTeacher)
  


router.route('/me')
  .get(protect, getTeacher)

module.exports = router;

