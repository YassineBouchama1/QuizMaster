const expressAsyncHandler = require('express-async-handler');
const quizModel = require('../models/quizModel');
const ApiError = require('../utils/ApiError');

// @DESC: Render HTML form for creating a quiz
exports.quizForm = (req, res) => res.render('teachers/quiz/create');

// @DESC: Create quiz and associated questions
// @ROUTE: POST quiz/
// @ACCESS: Private
exports.createQuiz = expressAsyncHandler(async (req, res, next) => {
    const { id: teacher_id } = req.user;
    const { title, description, viewAnswers, seeResult, successScore, status, questions } = req.body;

    // simple validation
    if (!title) {
        return next(new ApiError('Title is required', 400));
    }

    // simple validation for questions
    if (!Array.isArray(questions) || questions.length === 0) {
        return next(new ApiError('At least one question is required', 400));
    }

    //create array of questions from request body
    const questionData = questions.map(question => ({
        text: question.text,
        numberOfPoints: question.numberOfPoints,
        answerText: question.answerText
    }));

    try {
        // ue the addQuizWithQuestions func to insert quiz and questions in one transaction
        const quizCreated = await new Promise((resolve, reject) => {
            quizModel.addQuizWithQuestions(title, description, teacher_id, viewAnswers, seeResult, successScore, status, questionData, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });

        res.status(201).json({
            success: true,
            message: 'Quiz and questions created successfully',
            result: quizCreated
        });

    } catch (error) {
        console.error('Error creating quiz:', error.message);
        next(new ApiError(`Error creating quiz: ${error.message}`, 500));
    }
});
