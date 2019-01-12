const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Review } = require('../models');
const path = require('path');
const router = express.Router();

// home/ ~~~

//메인 페이지 렌더링 
router.get('/', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

//메인 페이지 - 요청
router.get('/dashboard', async (req, res, next) => {
  //await으로 연결해서 여러개 이용하기 
  try {
    let posts = [];

    posts = await Post.findAll({
      include : [{
        model : User,
        attributes : ['id', 'nick'],
      },{
        model : User,
        attributes : ['id', 'nick'],
        as : 'Liker',
      },{
        model : Review,
        // order : [['id']],
      }],
      // order : [['createdAt', 'DESC']],
    });

    return res.send({
      twits: posts,
      //post.js에서 넘어오는 정보들을 담는다 
      user: req.user,
      loginError: req.flash('loginError'),
    });
  } catch(error) {
      console.error(error);
      return next(error);
    }
});

module.exports = router;
