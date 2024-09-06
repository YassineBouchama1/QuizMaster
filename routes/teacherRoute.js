const express = require('express');
const {
  createTeacherForm,
  createTeacher,
  getAllTeachers,
  getTeacherById,
} = require('../controllers/teacherController');

const router = express.Router();

router.route('/')
  .get(getAllTeachers)
  .post(createTeacher);

router.route('/create')
  .get(createTeacherForm);

router.route('/:id')
  .get(getTeacherById)


module.exports = router;
