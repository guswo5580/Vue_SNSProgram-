const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');
const path = require('path');
const router = express.Router();


//프로필 페이지 빼도 됨
router.get('/', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

router.get('/information', (req, res) => {
    res.send( {user: req.user });
});

module.exports = router;