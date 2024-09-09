const express = require('express');
const {


  dashboardTeacher,
  getTeacher,
} = require('../controllers/teacherController');
const { protect } = require('../middlewares/guard');

const router = express.Router();

router.route('/')
  .get(dashboardTeacher)



router.route('/me')
  .get(protect, getTeacher)

module.exports = router;

