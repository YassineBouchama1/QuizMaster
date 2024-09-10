const express = require('express');
const path = require('path');
const teacherRouter = require('./routes/teacherRoute');


const authRouter = require('./routes/authRoute');
const guestRouter = require('./routes/guestRoute');
const quizRouter = require('./routes/quizRoute');
const classRouter = require('./routes/classRoute');
const studentRouter = require('./routes/studentRoute')
const homeRouter = require('./routes/homeRouter');

const globalError = require('./middlewares/globalError')

const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




// Routes
app.use('/teachers', teacherRouter);
app.use('/allQuiz', studentRouter);
app.use('/auth', authRouter);
app.use('/quiz', quizRouter);
app.use('/class', classRouter);


app.use('/', guestRouter); /// this for public routes: home page ....

app.use('/home', homeRouter);


// Handle 404 errors: not found page
app.use('*', (req, res, next) => {

  // next(new ApiError('not foun page', 404))
  return res.status(404).render('not-found');
});




// hlobal error handler
app.use(globalError);


// tart the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);


});

module.exports = app;