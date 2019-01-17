exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    //로그인 여부를 묻는다 -- 로그인을 했으면 
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // 로그인을 안했으면 
    next();
  } else {
    res.redirect('/');
  }
};
