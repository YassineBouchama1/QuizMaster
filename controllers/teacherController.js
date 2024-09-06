const expressAsyncHandler = require('express-async-handler');
const teacherModel = require('../models/teacher');
const ApiError = require('../utils/ApiError');

// render list of teachers
exports.getAllTeachers = expressAsyncHandler(async (req, res, next) => {
    console.log('getAllTeachers function called');
    teacherModel.getAllTeachers((err, results) => {
        console.log(err)
        if (err) return res.render('teachers/index', { teachers, error: 'there is a problem while fetch teachers list' });
        res.render('teachers/index', { teachers: results });
    })


});

// show page to create a new teacher
exports.createTeacherForm = (req, res) => {
    res.render('teachers/create');
};



// create a new teacher
exports.createTeacherApi = expressAsyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;


    console.log(req.body)
    // validation
    if (!firstName || !email) {
        return next(new ApiError('Name and email are required', 400));
    }

    try {
        await new Promise((resolve, reject) => {
            teacherModel.addTeacher(firstName, lastName, email, password, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        res.status(201).json({ success: true, message: 'Teacher created successfully' });
    } catch (error) {
        next(new ApiError(`Error creating teacher: ${error.message}`, 500));
    }
});

// show a single teacher
exports.getTeacherById = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    teacherModel.getTeacherById(id, (err, results) => {
        if (err) return next(new ApiError(`Error fetching teacher: ${err.message}`, 500));
        if (!results?.length) return next(new ApiError('Teacher not found', 404));
        res.render('teachers/show', { teacher: results[0] });
    });
});

