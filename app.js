require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth')
var projectsRouter = require('./routes/projects')
var taskRouter = require('./routes/task')
const connectDB = require('./database/config')

var app = express();

connectDB()

app
  .use('/api/auth', authRouter)
  .use('/api/users', usersRouter)
  .use('/api/projects', projectsRouter)
  .use('/api/tasks', taskRouter)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({
    ok: false,
    meg: message.error ? message.error : 'upss, hubo un error'
  })
});

module.exports = app;
