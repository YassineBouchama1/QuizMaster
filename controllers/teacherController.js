const expressAsyncHandler = require('express-async-handler');
const teacherModel = require('../models/teacher');
const ApiError = require('../utils/ApiError');
const quizModel = require('../models/quizModel');


// @DESC :render pages html 
exports.dashboardTeacher = async (req, res, next) => {
    const { id } = req.user;



    try {
        const quizzes = await quizModel.getAllQuizzesBelongTeacher(id);


        console
        res.render('teachers/index', { quizzes, user: req.user });
    } catch (error) {
        console.error('Error in controller:', error.message);
        next(new ApiError(`Error: ${error.message}`, 500));
    }



}





// @DESC get teacher information
// @ROUTE POST teachers/
// @ACCESS Privet
// render teacher page
exports.getTeacher = expressAsyncHandler(async (req, res, next) => {



    const { id } = req.user;

    try {

        //  fecth texhcer from db useing id
        const teacher = await new Promise((resolve, reject) => {
            teacherModel.getTeacherById(id, (err, resulte) => {
                if (err) reject(err); // if there is error send it to catch 
                else resolve(resulte);
            });
        });

        console.log(teacher)
        res.status(200).json({ teacher: teacher })

    } catch (error) {
        return next(new ApiError(`Error fetching teacher: ${error.message}`, 500));
    }

});



