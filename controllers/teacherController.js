const expressAsyncHandler = require('express-async-handler');
const teacherModel = require('../models/teacher');
const ApiError = require('../utils/ApiError');



// render list of teachers
exports.getAllTeachers = expressAsyncHandler(async (req, res, next) => {

    teacherModel.getAllTeachers((err, results) => {
        console.log(err)
        if (err) return res.render('teachers/index', { teachers, error: 'there is a problem while fetch teachers list' });
        res.render('teachers/index', { teachers: results });
    })


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

