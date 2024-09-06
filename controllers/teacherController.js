const expressAsyncHandler = require('express-async-handler');
const teacherModel = require('../models/teacher');
const ApiError = require('../utils/ApiError');



// render pages html 
exports.dashboardTeacher = (req, res) => res.render('teachers/index')



// @DESC get teacher information
// @ROUTE POST teachers/
// @DACCESS Privet
// render teacher page
exports.getTeacher = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    teacherModel.getTeacherById(id, (err, results) => {
        if (err) return next(new ApiError(`Error fetching teacher: ${err.message}`, 500));
        if (!results?.length) return next(new ApiError('Teacher not found', 404));
        res.status(200).json({ teacher: results[0] })
    });
});

