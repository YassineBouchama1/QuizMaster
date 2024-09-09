const expressAsyncHandler = require('express-async-handler');
const teacherModel = require('../models/teacher');
const authModel = require('../models/authModel');
const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');



const JWT_SECRET = process.env.JWT_SECRET

// create token by passing id user
const createToken = (payload) => jwt.sign({ userId: payload }, JWT_SECRET)




//----------------------------------1= load pages html----------------------------------

// show page to login page for teacher
exports.loginTeacherForm = (req, res) => res.render('auth/login')
// show page to signup page for teacher
exports.signUpTeacherForm = (req, res) => res.render('auth/signUp');






// ---------------------------2=apis------------------------

// @DESC signup new user
// @ROUTE POST auth/signup
// @DACCESS Poulic
exports.signUpTeacherApi = expressAsyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password, speciality, role } = req.body;


    // validation
    if (!firstName || !email || !password || !lastName, !(role && !speciality)) {
        return next(new ApiError('some fileds missing they are required', 400));
    }


    try {
        //  check if email exists in either students or teachers
        const existingUser = await new Promise((resolve, reject) => {
            authModel.checkEmailExists(email, (err, results) => {
                if (err) reject(err);
                else resolve(results[0]); // Ttake the first result if email exists
            });
        });

        if (existingUser) {
            return next(new ApiError('Email already existsin use', 400));
        }


        // crypt password 
        const salt = await bcrypt.genSaltSync(10);
        const cryptedPassowrd = await bcrypt.hash(password, salt)


        // if passed role is student create student
        if (role === 'student') {
            await new Promise((resolve, reject) => {
                authModel.addStudent(firstName, lastName, email, cryptedPassowrd, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            res.status(201).json({ success: true, message: 'Teacher created successfully' });
        }


        // if passed role is teacher create teacher
        else if (role === 'teacher') {
            await new Promise((resolve, reject) => {
                authModel.addTeacher(firstName, lastName, email, cryptedPassowrd, speciality, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            res.status(201).json({ success: true, message: 'Teacher created successfully' });
        }
        // if role is none of those ['teacher','student'] return error
        else {
            next(new ApiError(`Invalid role`, 404));
        }

    } catch (error) {
        next(new ApiError(`Error creating teacher: ${error.message}`, 500));
    }
});



// @DESC login user
// @ROUTE POST auth/login
// @DACCESS Poulic
exports.loginTeacherApi = expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return next(new ApiError('Some fields are missing and are required', 400));
    }

    try {
        // check if email exists in either students or teachers
        const user = await new Promise((resolve, reject) => {
            authModel.checkEmailExists(email, (err, results) => {
                if (err) reject(err);
                else resolve(results[0]); //take first result in arr 
            });
        });

        // if no user is found
        if (!user) {
            return next(new ApiError('Email or password incorrect', 404));
        }

        // compare password
        if (!(await bcrypt.compare(password, user.password))) {
            return next(new ApiError('Email or password incorrect', 404));
        }

        // create token
        const token = await createToken(user.id);

        res.status(201).json({
            success: true,
            message: 'Login successful',
            token,
            role: user.table_name === 'students' ? 'student' : 'teacher'
        });
    } catch (error) {
        next(new ApiError(`Error logging in: ${error.message}`, 500));
    }
});