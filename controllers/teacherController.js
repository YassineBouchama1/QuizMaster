const expressAsyncHandler = require('express-async-handler');
const teacherModel = require('../models/teacher');
const ApiError = require('../utils/ApiError');

// render list of teachers
exports.getAllTeachers = expressAsyncHandler(async (req, res, next) => {
    teacherModel.getAllTeachers((err, results) => {
        if (err) return next(new ApiError(`Error fetching teachers: ${err.message}`, 500));
        res.render('teachers/index', { teachers: results });
    });
});

// show page to create a new teacher
exports.createTeacherForm = (req, res) => {
    res.render('teachers/create');
};


// create a new teacher
exports.createTeacher = expressAsyncHandler(async (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return next(new ApiError('Name and email are required', 400));
    }

    teacherModel.addTeacher(name, email, (err) => {
        if (err) return next(new ApiError(`Error creating teacher: ${err.message}`, 500));
        res.redirect('/teachers');
    });
});


// show a single teacher
exports.getTeacherById = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    teacherModel.getTeacherById(id, (err, results) => {
        if (err) return next(new ApiError(`Error fetching teacher: ${err.message}`, 500));
        if (!results.length) return next(new ApiError('Teacher not found', 404));
        res.render('teachers/show', { teacher: results[0] });
    });
});

