const ApiError = require("../utils/ApiError");
const studentModel = require('../models/studentModel');
const expressAsyncHandler = require("express-async-handler");



exports.allQuiz = (req, res) => {
    res.render('students/index');
};






exports.assignQuizToStudentController = expressAsyncHandler(async (req, res, next) => {

    const { quizId, studentIds } = req.body;

    if (!quizId || !studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
        return next(new ApiError('Invalid input: quizId and studentIds array are required', 400));
    }

    //TODO: chcek if list of student belong this teacher

    try {
        const result = await studentModel.assignQuizToStudents(quizId, studentIds);
        res.status(201).json({
            success: true,
            message: 'Deleted successfully',
            result: result
        });
    } catch (error) {
        console.error('Error in controller:', error.message);
        next(new ApiError(`Failed to assign quiz: ${error.message}`, 500));
    }
})


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

