const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');
const path = require('path');
const router = express.Router();

//로그인 메인페이지
router.get('/login', (req, res) => {
    res.send(path.join(__dirname, '../dist', 'index.html'));
});

//회원가입 페이지
router.get('/join', isNotLoggedIn, (req, res) => {
    res.send(path.join(__dirname, '../dist', 'index.html'), {
      user: req.user,
      joinError: req.flash('joinError'),
    });
  });

module.exports = router;