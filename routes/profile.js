const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');
const path = require('path');
const router = express.Router();


//프로필 페이지 빼도 됨
router.get('/', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});
router.get('/dashboard', async (req, res, next) => {
    Post.findAll({ 
        where : { userId : req.user.id },
        //User 확인 후 정보를 찾기
        include : [{
            model : User,
            attributes : ['id', 'nick'],
        }, {
            model : User,
            attributes : ['id', 'nick'],
            as : 'Liker',
        }],
        order : [['createdAt', 'DESC']],
    })
    .then( (posts) => {
        res.send({
            twits : posts,
            user : req.user,
            loginError : req.flash('loginError'),
        });
    })
    .catch( (error) => {
        console.error(error);
        next(error);
    });
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
  router.post('/userImg' , async (req, res, next) => {
    try {
        await User.update({ userImg : req.body.url}, {
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