const express = require('express');
const path = require('path');
const teacherRouter = require('./routes/teacherRoute');

const ApiError = require('./utils/ApiError');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3000;
console.log(process.env.DB_HOST)
// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// middleware
app.use(express.json()); //
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // make puplic folder accesbly
app.use(bodyParser.json());


// Handle 404 errors : not found page
app.all('*', (req, res, next) => {
  // next(new ApiError(`Can't find this url ${req.originalUrl}`, 404));

  res.render('not-found')
});


// Routes 
app.use('/teachers', teacherRouter);




// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
});



// start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app; 