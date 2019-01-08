//팔로잉하는 라우터 
const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { User, Post, Review } = require('../models');

const router = express.Router();

router.post('/:id', isLoggedIn, async (req, res, next) => {
    try {
        if(req.body.content === null){
            res.send('No content');
        } else {
            const review = await Review.create({
                content : req.body.content,
                img : req.body.url,
                userId : req.user.id,
                postId : req.params.id
            });
            res.send('success');
        }
    }catch( error ) {
        console.error(error);
        next(error);
    }
});
router.get('/post/:id', isLoggedIn, async (req, res, next) => {
    Review.findAll({
       where : { postId : req.params.id},
       include : [{
           model : User,
           attributes : ['userImg', 'nick'],
       }],
       order : [['createdAt', 'DESC']],
    })
    .then( ( reviews ) => {
        res.send({
            reviews : reviews,
            user : req.user,
            loginError : req.flash('loginError'),
        })
    })
    .catch( (error) => {
        console.log(error);
        next(error);
    })
});

module.exports = router;
