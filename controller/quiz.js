
const expressAsyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');



// @desc    Create Quiz with teacher id
// @route   POST /api/v1/quiz
// @access  Private/studenty-teacher
exports.createQuiz = expressAsyncHandler(async (req, res, next) => {


    try {

        // add here logic create quiz

        res.status(200).json({ message: "test quiz create" })


    } catch (error) {
        return next(new ApiError(`Error Creating Product: ${error.message}`, 500));
    }


})



// @desc    get Quiz with id 
//// @route   DELETE /api/v1/quiz/:id
// @access  Private/studenty-teacher
exports.getOneQuiz = expressAsyncHandler(async (req, res, next) => {


    const { id } = req.params;


    // add here to get quiz

    res.status(200).json({ message: `this is quiz id you want : ${id}` })




})
