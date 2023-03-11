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

const bodyParser = require('body-parser');


var app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", `${process.env.URL_FRONT}`);
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

const cors = require('cors');
const checkToken = require('./middleware/checkToken');

const whiteList = [`${process.env.URL_FRONT}`]
const corsOption = {
  origin : function(origin, cb){
    if(whiteList.includes(origin)){
      cb(null, true)
    }else{
      cb(new Error('Error de Cors'))
    }
  }
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

connectDB()
app.use(cors())


app
  .use('/api/auth', authRouter)
  .use('/api/users', usersRouter)
  .use('/api/projects',checkToken, projectsRouter)
  .use('/api/tasks',checkToken, taskRouter)


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 
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
    msg: err.message ? err.message : 'upss, hubo un error'  })
});

module.exports = app;
