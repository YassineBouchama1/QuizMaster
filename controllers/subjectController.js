const { format } = require('date-fns');
const Subject = require('../models/subjectModel');

exports.subjectForm = async (req, res) => {
    try {
        const subjects = await Subject.getAllSubject();
        
        const formattedSubjects = subjects.map(subject => {
            subject.created_at = format(new Date(subject.created_at), 'dd EEE yyyy');
            return subject;
        })
        res.render('teachers/subjects/create', { subjects: formattedSubjects });
    } catch (error){
        console.error("Error retrieving subjects:", error);
        res.status(500).send('Error retrieving subjects');
    }
}

exports.createSubject = async (req, res) => {

    const {name} = req.body;

    if(!name) {
        return res.status(400).send('Subject name is required');
    }

    try {
        await Subject.create(name);
        res.redirect('/subject/create');
    }catch (error) {
        console.error(error);
        res.status(500).send('Error Creating Subject');
    }
}
exports.addSubSubject = async (req, res) => res.render('teachers/subjects/addSubSubject');