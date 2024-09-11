const express = require('express');
const {
  dashboardTeacher,
  getTeacher,
} = require('../controllers/teacherController');

const router = express.Router();

router.route('/')
  .get(dashboardTeacher)
  

const { protect } = require('../middlewares/guard');
router.route('/me')
  .get(protect, getTeacher)

module.exports = router;

