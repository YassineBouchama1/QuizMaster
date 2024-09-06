const expressAsyncHandler = require('express-async-handler');
const teacherModel = require('../models/teacher');
const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');



const JWT_SECRET = process.env.JWT_SECRET

// create token by passing id user
const createToken = (payload) => jwt.sign({ userId: payload }, JWT_SECRET)





// show page to signup page for teacher
exports.signUpTeacherForm = (req, res) => res.render('auth/signUp');



// create a new teacher
exports.signUpTeacherApi = expressAsyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;


    // validation
    if (!firstName || !email || !password || !lastName) {
        return next(new ApiError('some fileds missing they are required', 400));
    }

    // crypt password 
    const salt = await bcrypt.genSaltSync(10);
    const cryptedPassowrd = await bcrypt.hash(password, salt)

    try {
        await new Promise((resolve, reject) => {
            teacherModel.addTeacher(firstName, lastName, email, cryptedPassowrd, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
        res.status(201).json({ success: true, message: 'Teacher created successfully' });
    } catch (error) {
        next(new ApiError(`Error creating teacher: ${error.message}`, 500));
    }
});

// show page to login page for teacher
exports.loginTeacherForm = (req, res) => res.render('auth/login')




exports.loginTeacherApi = expressAsyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    console.log(req.body)
    // validation
    if (!email || !password) {
        return next(new ApiError('some fileds missing they are required', 400));
    }


    try {
        //  fecth texhcer from db useing email
        const isExist = await new Promise((resolve, reject) => {
            teacherModel.getTeacherByEmail(email, (err, resulte) => {
                if (err) reject(err); // if there is error send it to catch 
                else resolve(resulte);
            });
        });



        //compare password that teacher enterd with the pass in db 
        if (!isExist || !(await bcrypt.compare(password, isExist.password))) {
            return next(new ApiError(`email or passowrd uncourrect`, 404));
        }

        // create token 
        const token = await createToken(isExist.id)

        res.status(201).json({ success: true, message: 'login successfully', token });

    } catch (error) {
        next(new ApiError(`Error creating teacher: ${error.message}`, 500));
    }


})
