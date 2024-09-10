const express = require('express');

const { createClass, classForm, assignStudentsToClass } = require('../controllers/classController');
const { protect } = require('../middlewares/guard');

const router = express.Router();

router.route('/create')
  .get(classForm)



router.route('/create')
  .post(protect, createClass)

router.route('/asign')
  .post(protect, assignStudentsToClass)

module.exports = router;

