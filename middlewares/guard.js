const expressAsyncHandler = require('express-async-handler');

const teacherModel = require('../models/teacher');
const studentModel = require('../models/studentModel')
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const JWT_SECRET = process.env.JWT_SECRET



exports.protect = expressAsyncHandler(async (req, res, next) => {

    //1 check if token exist 
    // let token;
    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //     token = req.headers.authorization.split(' ')[1]
    // }


    // instead use cookies
    const token = req.cookies.token;
    console.log(token)

    if (!token) {
        return next(new ApiError('you are not login , plase login to get access  this route', 400))
    }
    //2) decoded Token 
    const decoded = jwt.verify(token, JWT_SECRET)




    // 3) Check if the user exists in the teachers table
    let currentUser = await new Promise((resolve, reject) => {
        teacherModel.getTeacherById(decoded.userId, (err, result) => {
            if (err) reject(err); // Handle errors
            else resolve(result);
        });
    });

    // 4) If not found in the teachers table, check the students table
    if (!currentUser) {
        currentUser = await new Promise((resolve, reject) => {
            studentModel.getStudentById(decoded.userId, (err, result) => {
                if (err) reject(err); // Handle errors
                else resolve(result);
            });
        });
    }






    if (!currentUser) {
        return next(new ApiError('the user that belong to this token does no longer exist or token expired', 401))
    }
    req.user = currentUser // pass all information user loged in in request object%
    console.log(currentUser)
    next()
})



//   // @desc    Authorization (User Permissions)
//   // ["admin", "manager"]
exports.allowedTo = (...roles) => expressAsyncHandler(async (req, res, next) => {
    console.log(roles)
    // 1) access roles
    // 2) access registered user (req.user.role)
    if (!roles.includes(req.user.role)) {
        return next(
            new ApiError('You are not allowed to access this route', 403)
        );
    }
    next();
});