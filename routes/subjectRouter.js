const express = require('express');

const { subjectForm, createSubject, addSubSubject } = require('../controllers/subjectController');
    
const router = express.Router();

 router.route('/create')
.get(subjectForm)
.post(createSubject);

router.route('/addSubSubject')
.get(addSubSubject);

module.exports = router;

