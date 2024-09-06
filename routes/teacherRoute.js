const express = require('express');
const {

  getAllTeachers,
  getTeacherById,

} = require('../controllers/teacherController');
const { protect } = require('../middleWares/guard');

const router = express.Router();

router.route('/')
  .get(protect, getAllTeachers)


router.route('/:id')
  .get(protect, getTeacherById)


module.exports = router;

