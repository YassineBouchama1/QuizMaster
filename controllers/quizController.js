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
    const { title, description, viewAnswers, seeResult, successScore, status, attempLimit, questions } = req.body;

    // simple validation
    if (!title || !attempLimit) {
        return next(new ApiError('missing required filed', 400));
    }

    // simple validation for questions
    if (!Array.isArray(questions) || questions.length === 0) {
        return next(new ApiError('At least one question is required', 400));
    }

    //create array of questions from request body
    const questionData = questions.map(question => ({
        text: question.text,
        numberOfPoints: question.numberOfPoints,
        answerText: question.answer
    }));

    try {
        // ue the addQuizWithQuestions func to insert quiz and questions in one transaction
        const quizCreated = await new Promise((resolve, reject) => {
            quizModel.addQuizWithQuestions(title, description, teacher_id, attempLimit, viewAnswers, seeResult, successScore, status, questionData, (err, result) => {
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




// @DESC: Get a quiz by ID with all associated questions and answers
// @ROUTE: GET /quiz/:id
// @ACCESS: Private
exports.getQuizById = expressAsyncHandler(async (req, res, next) => {
    const quizId = req.params.id;


    // 
    try {
        const quiz = await quizModel.getQuizWithAssociationsByQuizId(quizId);

        if (!quiz) {
            return next(new ApiError('Quiz not found', 404));
        }

        res.status(200).json(quiz);
    } catch (error) {
        console.error('Error in controller:', error.message);
        next(new ApiError(`Error: ${error.message}`, 500));
    }
});



// @DESC: Get a quiz belong teacher
// @ROUTE: GET /quiz/
// @ACCESS: Private : teacher 
exports.getAllQuizForTeacher = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.user;



    try {
        const quizzes = await quizModel.getAllQuizzesBelongTeacher(id);

  

        res.status(200).json(quizzes);
    } catch (error) {
        console.error('Error in controller:', error.message);
        next(new ApiError(`Error: ${error.message}`, 500));
    }
});


// @DESC: Get all quiz belong students teacher
// @ROUTE: GET /quiz/students
// @ACCESS: Private : students 
exports.quizBelongStudent = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.user;



    try {
        const quizzes = await quizModel.getAllQuizzesBelongStudent(id);

  

        res.status(200).json(quizzes);
    } catch (error) {
        console.error('Error in controller:', error.message);
        next(new ApiError(`Error: ${error.message}`, 500));
    }
});



exports.deleteQuiz = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;

    try {
        // check if this quiz exst
        const quizzes = await quizModel.deleteQuizById(id);

    

        res.status(201).json({
            success: true,
            message: 'Deleted successfully',
            result: quizzes
        });

    } catch (error) {
        console.error('Error in controller:', error.message);
        next(new ApiError(`Error: ${error.message}`, 500));
    }

})


exports.updateQuiz = expressAsyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        // check if the quiz exists
        const quizExists = await quizModel.findQuizById(id);

        if (!quizExists) {
            return next(new ApiError('Quiz not found', 404));
        }

        // update the quiz with only the provided fields
        const updatedQuiz = await quizModel.updateQuizById(id, updateData);

        res.status(200).json({
            success: true,
            message: 'Quiz updated successfully',
            result: updatedQuiz
        });

    } catch (error) {
        console.error('Error in controller:', error.message);
        next(new ApiError(`Error: ${error.message}`, 500));
    }
});
