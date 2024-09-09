const expressAsyncHandler = require('express-async-handler');
const quizModel = require('../models/quizModel');
const questionModel = require('../models/questionModel');
const ApiError = require('../utils/ApiError');

// @DESC :render pages html :form quiz
exports.quizForm = (req, res) => res.render('teachers/quiz/create');


// @DESC create quiz
// @ROUTE POST quiz/
// @ACCESS Private
exports.createQuiz = expressAsyncHandler(async (req, res, next) => {
    const { id: teacher_id } = req.user;
    const { title, description, viewAnswers, seeResult, successScore, status, questions } = req.body;

    // Simple validation
    if (!title) {
        return next(new ApiError('Title is required', 400));
    }

    // simple validation for question
    if (!Array.isArray(questions) || questions.length === 0) {
        return next(new ApiError('At least one question is required', 400));
    }

    console.log('hello createQuiz');

    try {
        // call the function to add a new quiz
        const quizCreated = await new Promise((resolve, reject) => {
            quizModel.addQuiz(title, description, teacher_id, viewAnswers, seeResult, successScore, status, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });


        console.log(quizCreated)
        const quizId = quizCreated.insertId; // get id quiz after created

        // call the function to add questions
        const questionPromises = questions.map(question => {
            return new Promise((resolve, reject) => {
                questionModel.addQuestion(quizId, question.text, question.numberOfPoints, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        });

        // wait until all questions created
        await Promise.all(questionPromises);

        res.status(201).json({ success: true, message: 'Quiz and questions created successfully', result: quizCreated });

    } catch (error) {
        console.error('Error creating quiz:', error.message);

        // remove quiz if questions creation fails
        if (error.message.includes('questions')) {
            console.log('removed ')
            try {
                await new Promise((resolve, reject) => {
                    quizModel.deleteQuizById(quizCreated.insertId, (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
                next(new ApiError(`Error creating questions so i remved quiz: ${error.message}`, 500));

            } catch (removeError) {
                console.error('Error removing quiz:', removeError.message);
            }
        }

        next(new ApiError(`Error creating quiz: ${error.message}`, 500));
    }
});