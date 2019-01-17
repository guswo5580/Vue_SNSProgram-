const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const helmet = require('helmet');
const hpp = require('hpp');
const RedisStore = require('connect-redis')(session);
require('dotenv').config();

const HomeRouter = require('./routes/home');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const LoginRouter = require('./routes/login');
const ProfileRouter = require('./routes/profile');
const ReviewRouter = require('./routes/review');
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const logger = require('./logger.js');

const app = express();
sequelize.sync();
passportConfig(passport);

app.set('view engine', 'pug');
app.set('port', process.env.PORT || 80);
if(process.env.NODE_ENV === 'production'){
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(hpp());
}else {
  app.use(morgan('dev'));
}

app.use(express.static('dist'));
//기본 주소 '/'
app.use('/img', express.static(path.join(__dirname, 'uploads')));
//이미지를 저장하기 위한 접근 추소를 새롭게 추가
// /img = 프론트에서 접근하는 경로 , /uploads = 백에서 접근하는 경로 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true, 
    secure: false,
  },
  store : new RedisStore({
    host : process.env.REDIS_HOST,
    port : process.env.REDIS_PORT, 
    pass : process.env.REDIS_PASSWORD,
    logError : true,
  }),
}
if(process.env.NODE_ENV === 'production'){
  sessionOption.proxy = true;
}
app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//deserializeUser가 실행되는 부분

app.use('/', LoginRouter);
app.use('/home', HomeRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/profile', ProfileRouter);
app.use('/review', ReviewRouter);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  logger.info('hello');
  logger.error(err.message);
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
