const express = require('express');
const {
  signUpTeacherForm,
  signUpTeacherApi,
  loginTeacherApi,
  loginTeacherForm
} = require('../controllers/authController');

const router = express.Router();


router.route('/signUp')
  .get(signUpTeacherForm)
  .post(signUpTeacherApi);

router.route('/login')
  .get(loginTeacherForm)
  .post(loginTeacherApi);


 
module.exports = router;
