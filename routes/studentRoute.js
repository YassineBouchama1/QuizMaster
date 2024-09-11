const express = require('express');
const {  dashboardStudent } = require('../controllers/studentController');

const router = express.Router();

router.route('/')
.get(dashboardStudent);

module.exports = router;
