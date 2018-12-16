const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email', //req.body.email
    passwordField: 'password', //req.body.password 반드시 일치해야한다 
  }, async (email, password, done) => { //done(에러, 성공, 실패)
    try {
      const exUser = await User.find({ where: { email } });
      //이메일이 있는지 검사
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        //이메일이 있으면 사용자가 입력한 password와 db의 password를 비교 
        if (result) {
          done(null, exUser);
          
        } else {
          done(null, false, { message: '이메일 , 비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
        //이메일이 없으면 
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
