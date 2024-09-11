const express = require('express');
const { protect, allowedTo } = require('../middlewares/guard');
const { createClass, classForm, assignStudentsToClass } = require('../controllers/classController');

const router = express.Router();




router.route('/create')
.get(classForm)
  .post(protect, allowedTo('teacher'), createClass)

router.route('/assign')
  .post(protect, allowedTo('teacher'), assignStudentsToClass)

module.exports = router;

