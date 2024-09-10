const ApiError = require("../utils/ApiError");
const studentModel = require('../models/studentModel');
const expressAsyncHandler = require("express-async-handler");
exports.allQuiz = (req, res) => {
    res.render('students/index');
};





// thsi cntroller for bring all students belong this teacher
exports.studentsBelongTeacher = expressAsyncHandler(async (req, res, next) => {

    const { id } = req.user



    try {

        const students = await studentModel.students(id)

        res.status(200).json(students)
    } catch (error) {
        console.error('Error in controller:', error.message);
        next(new ApiError(`Error: ${error.message}`, 500));
    }


})