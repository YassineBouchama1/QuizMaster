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

//@desc: this func for create request to play game again after reach limit attemps 
// Access Private : Student - teacher

exports.createRequest = expressAsyncHandler(async (req, res, next) => {

    const { id: idStudent } = req.user
    const { id: idQuiz } = req.params
    try {

        const requestCreated = await studentModel.insertRequest(idStudent, idQuiz)


        res.status(201).json({
            success: true,
            message: 'Request Created successfully',
            result: requestCreated
        });
    } catch (error) {
        console.error('Error in controller:', error.message);
        next(new ApiError(`Error: ${error.message}`, 500));
    }
})


//@desc: this func for create request to play game again after reach limit attemps 
// Access Private : Student - teacher

exports.updateRequestStatus = expressAsyncHandler(async (req, res, next) => {

    const { status } = req.body;
    const { id } = req.params;  // id request
    try {


        //TODO: check if this request is exists

        const requestUpdated = await studentModel.updateRequestWithAttempt(id, status)

        // check if teacher accept request 
        // in this case 
        //TODO: update first attemp to become deactivate
        if (status === 'accept') {


        }


        res.status(201).json({
            success: true,
            message: 'Request Updated successfully',
            result: requestUpdated
        });
    } catch (error) {
        console.error('Error in controller:', error.message);
        next(new ApiError(`Error: ${error.message}`, 500));
    }
})