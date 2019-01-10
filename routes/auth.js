//회원가입
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

//POST /auth/join
//inNotLoggedIn  => 로그인을 안했을 때만 이용가능한 라우터라는 소리
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.find({ where: { email } });
    //이메일 검사 
    if (exUser) {
      req.flash('joinError', '이미 가입된 이메일입니다.');
      return res.send('Already');
    }
    const hash = await bcrypt.hash(password, 12);
    //없다면 비밀번호를 우선 암호화 
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.send('Completed');
    //회원가입이 완료되면 메인 페이지로 

  } catch (error) {
    console.error(error);
    return next(error);
  }
});

//POST /auth/login
//inNotLoggedIn  => 로그인을 안했을 때만 이용가능한 라우터라는 소리
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
                              //localStrategy를 수행하고 
                              //done에서의 에러, 성공, 실패가 전달
    if (authError) {
      //에러가 나면 
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      //에러도 아니고, 사용자 정보도 없으면 == 실패 
      req.flash('loginError', info.message);
      return res.redirect('/');
    }
    return req.login(user, (loginError) => {
      //성공인 경우 
      if (loginError) {
        //혹시나 또다른 에러가 발생한다면 
        console.error(loginError);
        return next(loginError);
      }
      return res.send(user);
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙임.
});


//inLoggedIn  => 로그인 한 사람만 로그아웃을 할 수 있기 때문에 
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  //세션 역시 지울 수 있다
  res.redirect('/');
});

////////////////////////////////////////////////////////////////////
//카카오는 로그인 로그아웃 부분이 따로 없다
//GET /auth/kakao 
router.get('/kakao', passport.authenticate('kakao'));
                              //kakao를 실행시킬 수 있는 요소 

// kakaoStrategy.js 의 callbackURL: '/auth/kakao/callback'와 주소가 일치해야한다 
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
  //로그인이 실패했으면 메인 라우터로 되돌아가기 
}), (req, res) => {
  res.redirect('/');
  //로그인이 성공해도 메인 라우터로 돌아가기 
});

// get kakao가 실행되면 kakaoStrategy에서 조회를 한 후 
// get kakao/callback이 실행되고 kakaoStrategy에서 async 부분을 수행한다 

module.exports = router;
