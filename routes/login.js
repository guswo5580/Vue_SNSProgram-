const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');
const path = require('path');
const router = express.Router();

//로그인 메인페이지
router.get('/login', isNotLoggedIn,  (req, res) => {
    res.send(path.join(__dirname, '../dist', 'index.html'));
});

//회원가입 페이지
router.get('/join', isNotLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

router.get('/example', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});
module.exports = router;