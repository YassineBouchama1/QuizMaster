const express = require('express');

const { subjectForm, createSubject } = require('../controllers/subjectController');
    
const router = express.Router();

 router.route('/create')
.get(subjectForm)
.post(createSubject);

module.exports = router;
