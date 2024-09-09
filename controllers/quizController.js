const expressAsyncHandler = require('express-async-handler');
const quizModel = require('../models/quiz');
const ApiError = require('../utils/ApiError');


// @DESC :render pages html 
exports.quizForm = (req, res) => res.render('teachers/quiz/create')



// @DESC create quiz
// @ROUTE POST quiz/
// @ACCESS Privet
// render teacher 
exports.createQuiz = expressAsyncHandler(async (req, res, next) => {
    const { id: teacher_id } = req.user;
    const { title, description, viewAnswers, seeResult, successScore, status } = req.body;

    //simple  validation
    if (!req.body.title) {
        return next(new ApiError('some fileds missing they are required', 400));
    }

    console.log('hello createQuiz')

    try {

        // call the function to add az new quiz
        await new Promise((resolve, reject) => {
            quizModel.addQuiz(title, description, teacher_id, viewAnswers, seeResult, successScore, status, (err, result) => {
                if (err) reject(err);
                else resolve();
            });

            res.status(201).json({ success: true, message: 'Quiz created successfully' });
        })
    } catch (error) {
        next(new ApiError(`Error creating quiz: ${error.message}`, 500));
    }


})
