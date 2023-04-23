var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var bodyParser = require('body-parser')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var userRouter = require('./routes/user');
var productRouter = require('./routes/sanpham');
var loginRouter = require('./routes/login');  
var apiRouter = require('./routes/api');  
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname,'/public/stylesheets')));
app.use(express.static(path.join(__dirname,'/public/javascripts')));
app.use(express.static(path.join(__dirname,'/public/images')));



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// app.use('/', indexRouter);
app.use(session({
  secret: 'RIKAKI0911ch2kavbfHnnnns53wed',
  resave: true,
  saveUninitialized: true
  }))



app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/',loginRouter);
app.use('/api',apiRouter);


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
  if(req.originalUrl.indexOf('/api') ==0 ){
    res.json(
      {
        msg: err.message
      }
    );
  }else{
    res.render('error');
  }
 
});

module.exports = app;
