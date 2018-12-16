const KakaoStrategy = require('passport-kakao').Strategy;
//kakao 에서는 bcrypt는 사용할 필요없음 
const { User } = require('../models');

module.exports = (passport) => {
  passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
                //제작한 앱을 기초로 그 안에서 ID를 받는다 
    callbackURL: '/auth/kakao/callback',
                //callback을 받을 router -> kakao에 인증 요청을 받고, 내용을 전달받는 router 
  }, async (accessToken, refreshToken, profile, done) => {
          //sns를 통해 받는 것은 token 기반으로 내용을 전달 
    try {
      //카카오가 인증을 해주지만 그래도 DB에도 정보를 저장한다  
      const exUser = await User.find({ 
        //DB에 이미 저장되어있는지 확인하고
        where: { 
          snsId: profile.id, 
          provider: 'kakao' 
          //카카오에서 받아온 정보를 저장 
        } 
      });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          email: profile._json && profile._json.kaccount_email,
          nick: profile.displayName,
          snsId: profile.id,
          provider: 'kakao',
          //회원정보를 받아온 주체가 어디인지 표현
        });
        done(null, newUser);
        //성공하면 DB에 내용을 저장 
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
//절차 
// DB에 저장되어있는 사람인지 판단하고 통과시켜 주던가
// 그게 아니라면 새롭게 생성해주던가 
// 따로 회원가입의 절차가 필요가 없음
