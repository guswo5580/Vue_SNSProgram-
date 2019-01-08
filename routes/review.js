//팔로잉하는 라우터 
const express = require('express');

const { isLoggedIn } = require('./middlewares');
const { User, Post, Review } = require('../models');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
    try {
        if(req.body.content === ''){
            res.send('No content');
        } else {
            const review = await Review.create({
                content : req.body.content,
                img : req.body.url,
                userId : req.user.id,
                postId : req.body.postId
            });
            res.send('success');
        }
    }catch( error ) {
        console.error(error);
        next(error);
    }
});
router.get('/:id', isLoggedIn, async (req, res, next) => {
    Review.findAll({
       where : { postId : req.params.id},
       include : [{
           model : User,
           attributes : ['userImg', 'nick'],
       }]
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
