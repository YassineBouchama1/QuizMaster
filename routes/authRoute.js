const express = require('express');
const {
  signUpTeacherForm,
  signUpTeacherApi,
  loginTeacherApi,
  loginTeacherForm,
  logOut
} = require('../controllers/authController');

const router = express.Router();


router.route('/signUp')
  .get(signUpTeacherForm)
  .post(signUpTeacherApi);

router.route('/login')
  .get(loginTeacherForm)
  .post(loginTeacherApi);


router.route('/logout')
  .get(logOut)



module.exports = router;
