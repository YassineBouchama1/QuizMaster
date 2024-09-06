const express = require('express');
const {
  createTeacherForm,

  getAllTeachers,
  getTeacherById,
  createTeacherApi,
} = require('../controllers/teacherController');

const router = express.Router();

router.route('/')
  .get(getAllTeachers)


router.route('/create')
  .get(createTeacherForm)
  .post(createTeacherApi);

router.route('/:id')
  .get(getTeacherById)


module.exports = router;
