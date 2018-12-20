//팔로잉하는 라우터 
const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.find({ where: { id: req.user.id } });
    //로그인한 사람을 찾아서 id 가져오기 
    await user.addFollowing(parseInt(req.params.id, 10));
    //A.addB 를 통해 관계를 생성해준다 
    //DB에 followingId 와 followerId 가 채워진다 
    res.send('success');
  } catch (error) {
    console.error(error);
    next(error);
  }
});
//팔로우 끊기 
router.post('/:id/unfollow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.find({ where: { id: req.user.id } });
    //로그인한 사람을 찾아서 id 가져오기 
    await user.removeFollowing(parseInt(req.params.id, 10));
    //A.removeB 를 통해 관계를 제거해준다 
    res.send('success');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
