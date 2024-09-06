const expressAsyncHandler = require('express-async-handler');
const teacherModel = require('../models/teacher');
const ApiError = require('../utils/ApiError');


// @DESC :render pages html 
exports.dashboardTeacher = (req, res) => res.render('teachers/index')



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

