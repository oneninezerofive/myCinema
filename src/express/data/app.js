var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//登录页
var loginsRouter = require('./routes/login');
//注册页
var regRouter = require('./routes/reg');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (req, res, next) {
  // console.log(777,req.method);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,OPTIONS,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if(req.method === 'OPTIONS'){
    res.sendStatus(200);
    // res.send('ok')
  }else{
    next();
  }

});
//解决通信跨域问题，use是express注册中间件的方法


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login',loginsRouter);//登录页
app.use('/reg',regRouter);//注册页



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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
