const express = require('express');

const { createClass, classForm, assignStudentsToClass } = require('../controllers/classController');
const { protect, allowedTo } = require('../middleWares/guard');

const router = express.Router();




router.route('/create')
.get(classForm)
  .post(protect, allowedTo('teacher'), createClass)

router.route('/assign')
  .post(protect, allowedTo('teacher'), assignStudentsToClass)

module.exports = router;

