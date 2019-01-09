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
                postId : req.params.id,
                userId : req.user.id,
                userImg : req.user.userImg,
                userNick : req.user.nick
            });
            res.send('success');
        }
    }catch( error ) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
