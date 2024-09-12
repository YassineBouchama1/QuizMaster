const express = require('express');

const { subjectForm, createSubject, addSubSubject, getSubjectDetails, createSubSubject } = require('../controllers/subjectController');
    
const router = express.Router();

 router.route('/create')
.get(subjectForm)
.post(createSubject);

router.route('/addSubSubject')
.get(addSubSubject)
.post(createSubSubject);

router.get('/:id', getSubjectDetails);
module.exports = router;

