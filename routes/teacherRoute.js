const express = require('express');
const {

  getTeacherById,

} = require('../controllers/teacherController');
const { protect } = require('../middleWares/guard');

const router = express.Router();

router.route('/')
  .get(protect, getTeacherById)



module.exports = router;

