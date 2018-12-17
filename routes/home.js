const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');
const path = require('path');
const router = express.Router();

// home/ ~~~

//메인 페이지 렌더링 
router.get('/', isLoggedIn, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

//메인 페이지 - 요청
router.get('/dashboard', (req, res, next) => {
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
