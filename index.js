const express = require('express');
const path = require('path');
const teacherRouter = require('./routes/teacherRoute');
const testRoute = require('./routes/index');
const ApiError = require('./utils/ApiError');
const globalError = require('./middleWares/globalError')

const app = express();
const port = process.env.PORT || 3000;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/teachers', teacherRouter);
app.use('/test', testRoute);

// Handle 404 errors: not found page
app.use('*', (req, res, next) => {

  next(new ApiError('not foun page', 404))
  // res.status(404).render('not-found');
});




// hlobal error handler
app.use(globalError);


// tart the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);


});

module.exports = app;