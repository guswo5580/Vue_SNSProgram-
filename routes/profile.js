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

router.post('/nickname' , async (req, res, next) => {
    try {
      await User.update({ nick : req.body.nick}, {
        where : { id : req.user.id },
      });
      res.redirect('/profile');
      res.send('Completed');
    }
    catch (err) {
      console.log(err);
      next(err);
    }
  });

module.exports = router;