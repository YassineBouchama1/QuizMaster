const ApiError = require("../utils/ApiError");
const requestModel = require('../models/requestModel');
const expressAsyncHandler = require("express-async-handler");





//@desc: this func for create request to play game again after reach limit attemps 
// Access Private : Student - teacher

exports.createRequest = expressAsyncHandler(async (req, res, next) => {

    const { id: idStudent } = req.user
    const { quizId } = req.params
    const { description } = req.body
    try {

        const requestCreated = await requestModel.insertRequest(idStudent, quizId, description)


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
    const { quizId } = req.params;  // quizId request
    try {


        //DONE: check if this request is exists
        //TODO: validate status

        const requestUpdated = await requestModel.updateRequestWithAttempt(quizId, status)


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


exports.getRequests = expressAsyncHandler(async (req, res, next) => {

    const { id } = req.user;

    try {



        const requestUpdated = await requestModel.updateRequestWithAttempt(quizId, status)


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