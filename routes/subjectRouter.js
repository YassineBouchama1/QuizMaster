const express = require('express');

const { subjectForm, createSubject, addSubSubject, getSubjectDetails, createSubSubject, deleteSubject } = require('../controllers/subjectController');
    
const router = express.Router();

 router.route('/create')
.get(subjectForm)
.post(createSubject);

router.route('/addSubSubject')
.get(addSubSubject)
.post(createSubSubject);

router.route('/:id')
.get(getSubjectDetails)
.delete(deleteSubject);
module.exports = router;

