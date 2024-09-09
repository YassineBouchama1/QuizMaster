const express = require('express');
const { allQuiz } = require('../controllers/studentController');

const router = express.Router();

router.route('/')
.get(allQuiz);

module.exports = router;
