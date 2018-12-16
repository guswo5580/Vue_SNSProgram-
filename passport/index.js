const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

const user = {};
//db 요청 횟수를 줄이기 위한 캐싱 객체 

//serializeUser, deserializeUser는 세션에 저장하며 작동하는 구간
//모든 사용자 정보를 세션에 저장하기에는 너무 무겁기 때문에 id만 이용한다 
module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
    //user의 id만 세션에 저장하도록 한다 
  });

  passport.deserializeUser((id, done) => {
    //저장된 user의 id를 가지고 user의 모든 정보를 만들어내는 과정 
    //req.user에 보내주는 작업 ,, 요청이 갈 때마다 매번 호출된다 
    if(user[id]) {
      done(user[id]);
    } else {
      User.find({
        where: { id },
        //id를 검색할 때 팔로잉, 팔로워에 대한 정보를 표현하도록 해준다 
        include: [{
          model: User,
          attributes: ['id', 'nick'],
          as: 'Followers',
        }, {
          model: User,
          attributes: ['id', 'nick'],
          as: 'Followings',
        }],
      })
        .then(user => done(null, user))
        .catch(err => done(err));
    }
  });

  local(passport);
  kakao(passport);
};
