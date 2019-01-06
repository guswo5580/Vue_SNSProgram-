const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User } = require('../models');
const path = require('path');
const router = express.Router();

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
        },],
        order : [['createdAt', 'DESC']],
    })
    .then( (posts) => {
        res.send({
            twits : posts,
            user : req.user,
            loginError : req.flash('loginError'),
            // follow : isfollow,
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

//////////////////////////////////////////////////////////////////////

router.get('/:id', isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});
router.get('/:id/dashboard', async (req, res, next) => {
    Post.findAll({
        where : { userId : req.params.id },
        include : [
            {
                model : User,
                attributes : ['id', 'nick'],
            },{
                model : User,
                attributes : ['id', 'nick'],
                as : 'Liker',
            }
        ],
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
        console.log(error);
        next(error);
    })
}); 
router.get('/:id/information' , async (req, res, next) => {
    User.find({
        where : {id : req.params.id},
        include : [
            {
                model : User,
                attributes : ['id', 'nick'],
                as : 'Followers',
            }, {
                model : User,
                attributes : ['id', 'nick'],
                as : 'Followings'
            }
        ],
    })
    .then( (users) => {
        res.send({
            user : users,
            loginError : req.flash('loginError'),
        });
    })
    .catch( (error) => {
        console.error(error);
        next(error);
    });
});
////////////////////////////////////////////////////////////
router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
    try {
      const user = await User.find({ where: { id: req.params.id } });
      //로그인한 사람을 찾아서 id 가져오기 
      await user.addFollower(parseInt(req.user.id, 10));
      //A.addB 를 통해 관계를 생성해준다 
      //DB에 followingId 와 followerId 가 채워진다 
      res.send('success');
    } catch (error) {
      console.error(error);
      next(error);
    }
  });
  router.post('/:id/unfollow', isLoggedIn, async (req, res, next) => {
    try {
      const user = await User.find({ where: { id: req.params.id } });
      //로그인한 사람을 찾아서 id 가져오기 
      await user.removeFollower(parseInt(req.user.id, 10));
      //A.removeB 를 통해 관계를 제거해준다 
      res.send('success');
    } catch (error) {
      console.error(error);
      next(error);
    }
  });  

module.exports = router;