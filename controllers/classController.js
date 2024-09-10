const expressAsyncHandler = require('express-async-handler');
const classModel = require('../models/classModel');
const ApiError = require('../utils/ApiError');


// @DESC :render pages html 
exports.classForm = (req, res) => res.render('teachers/classes/create')
exports.assignForm = (req, res) => res.render('teachers/classes/assign')



// @DESC get teacher information
// @ROUTE POST teachers/
// @ACCESS Privet
// render teacher page
exports.createClass = expressAsyncHandler(async (req, res, next) => {



    const { id } = req.user;

    // simple validation
    if (!id || !req.body.name) {
        return next(new ApiError('filed is missing ', 400));
    }





    try {

        // check if teacher has already class
        const hasClass = await classModel.getTeacherById(id)
        console.log(hasClass)
        if (hasClass) {
            return next(new ApiError('already has class', 400));
        }


        const classCreated = await classModel.inserClass(req.body.name, id)


        res.status(201).json({
            success: true,
            message: 'Class created successfully',
            result: classCreated
        });

    } catch (error) {
        return next(new ApiError(`Error fetching class: ${error.message}`, 500));
    }

});





exports.assignStudentsToClass = expressAsyncHandler(async (req, res, next) => {
    const { classId, studentIds } = req.body;



    // simple validation
    if (!Array.isArray(studentIds) || studentIds.length === 0) {
        return next(new ApiError('At least one student is required', 400));
    }


    try {

        const isAssigned = await classModel.assignStudentsToClass(classId, studentIds)

        res.status(201).json({
            success: true,
            message: 'Assigned successfully',
            result: isAssigned
        });

    } catch (error) {

        return next(new ApiError(`Error assigning students: ${error.message}`, 500));
    }


})
