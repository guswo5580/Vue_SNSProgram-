const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');
const path = require('path');
const router = express.Router();

// home/ ~~~

//프로필 페이지 빼도 됨
router.get('/profile', isLoggedIn, (req, res) => {
  res.send(path.join(__dirname, '../dist', 'index.html'), { title: '내 정보', user: req.user });
});

//메인 페이지
router.get('/', (req, res, next) => {
  Post.findAll({
    include: [{
      model: User,
      attributes: ['id', 'nick'],
    }, {
      model : User,
      attributes : ['id', 'nick'],
      as : 'Liker',
    }],
    order: [['createdAt', 'DESC']],
  })
    .then((posts) => {
      res.send({
        twits: posts,
        //post.js에서 넘어오는 정보들을 담는다 
        user: req.user,
        //없어도 됨
        loginError: req.flash('loginError'),
      });
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

module.exports = router;
