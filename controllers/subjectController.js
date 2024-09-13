const { format } = require('date-fns');
const Subject = require('../models/subjectModel');

exports.subjectForm = async (req, res) => {
    try {
        const subjects = await Subject.getAllSubject();
        const formattedSubjects = subjects.map(subject => {
            subject.created_at = format(new Date(subject.created_at), 'dd EEE yyyy');
            return subject;
        });
        res.render('teachers/subjects/create', { subjects: formattedSubjects });
    } catch (error) {
        console.error("Error retrieving subjects:", error);
        res.status(500).send('Error retrieving subjects');
    }
};

exports.createSubject = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).send('Subject name is required');
    }

    try {
        await Subject.create(name);
        res.redirect('/subject/create');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Creating Subject');
    }
};
exports.createSubSubject = async (req, res) => {
    const { name, subSubject_id } = req.body;

    if(!name){
        return res.status(400).send('Sub Subject Name Required');
    }
    if(!subSubject_id) {
        return res.status(400).send('Subject Required');
    }
    try {
        await Subject.create(name, subSubject_id);
        res.redirect('/subject/create');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating subSubject');
    }
}

exports.addSubSubject = async (req, res) => {
    res.render('teachers/subjects/addSubSubject');
};

exports.getSubjectDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const subject = await Subject.getSubjectById(id);
        const subSubjects = await Subject.getSubSubjects(id);
        if (!subject) {
            return res.status(404).send('Subject Not Found');
        }
        res.render('teachers/subjects/addSubSubject', { subject, subSubjects });
    } catch (error) {
        console.error('Error retrieving subject details:', error);
        res.status(500).send('Error retrieving subject details');
    }
};


exports.deleteSubject = async (req, res) => {
    const { id } = req.params;

    try {
        await Subject.deleteSubject(id);
        res.redirect('/subject/create'); // Redirect to a relevant page
    } catch (error) {
        console.error('Error deleting subject:', error);
        res.status(500).send('Error deleting subject');
    }
};
